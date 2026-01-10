import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Please provide username and password' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const shouldBeAdmin = adminEmails.includes(user.email.toLowerCase());

    if (user.isAdmin !== shouldBeAdmin) {
      user.isAdmin = shouldBeAdmin;
      await user.save();
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        domain: user.domain,
        reason: user.reason,
        hasSelection: user.hasSelection,
        round: user.round,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}