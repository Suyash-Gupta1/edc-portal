import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, email, mobileNumber, password, domain, reason, selfRating, responses } = body;

    if (!username || !email || !password || !domain || !reason) {
      return NextResponse.json(
        { error: 'Please provide all fields, including your reason for joining.' },
        { status: 400 }
      );
    }
    
    if (!mobileNumber) {
        return NextResponse.json(
          { error: 'Please provide a mobile number.' },
          { status: 400 }
        );
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const isAdminUser = adminEmails.includes(email.toLowerCase());

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      mobileNumber,
      password: hashedPassword,
      domain,
      reason,
      isAdmin: isAdminUser,
      hasSelection: false,
      selfRating: selfRating || 0,
      responses: responses || []
    });

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        domain: user.domain,
        reason: user.reason,
        isAdmin: user.isAdmin,
        hasSelection: user.hasSelection
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}