import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, email, password, domain, reason } = body;

    // Validation
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

    // --- BCRYPT HASHING LOGIC ---
    // 1. Generate a salt
    const salt = await bcrypt.genSalt(10);
    // 2. Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with HASHED password
    const user = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hash, not the plain text
      domain,
      reason,
      hasSelection: false
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