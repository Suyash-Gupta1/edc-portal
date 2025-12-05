import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, email, password, domain, reason } = body;

    if (!username || !email || !password || !domain || !reason) {
      return NextResponse.json(
        { error: 'Please provide all fields, including your reason for joining.' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    // Note: In a production app, you must hash the password (e.g., using bcrypt) here.
    const user = await User.create({
      username,
      email,
      password, // Storing plain text for demo purposes only per request
      domain,
      reason,
      hasSelection: false // explicitly set default
    });

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        domain: user.domain,
        reason: user.reason,
        hasSelection: user.hasSelection
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}