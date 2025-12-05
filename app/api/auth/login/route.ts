import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // Import bcrypt

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

    // 1. Find user
    const user = await User.findOne({ username });

    // 2. Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 3. Compare provided password with stored HASHED password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 4. Success
    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        domain: user.domain,
        reason: user.reason,
        hasSelection: user.hasSelection,
        round: user.round 
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}