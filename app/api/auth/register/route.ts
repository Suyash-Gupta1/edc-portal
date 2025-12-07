import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    
    // Extract both possible field names
    let { username, email, mobileNumber, phone, password, domain, reason } = body;

    // FALLBACK: If mobileNumber is missing, try using 'phone'
    if (!mobileNumber && phone) {
        mobileNumber = phone;
    }

    // 1. Basic Validation
    if (!username || !email || !password || !domain || !reason) {
      return NextResponse.json(
        { error: 'Please provide all fields, including your reason for joining.' },
        { status: 400 }
      );
    }
    
    if (!mobileNumber) {
        return NextResponse.json(
          { error: 'Please provide a WhatsApp number.' },
          { status: 400 }
        );
    }

    // 2. Check for duplicates (Username, Email, OR Mobile Number)
    // Since mobileNumber is unique in schema, we must check it here too
    const userExists = await User.findOne({ 
      $or: [
        { email }, 
        { username },
        { mobileNumber } 
      ] 
    });

    if (userExists) {
      let errorMessage = 'User already exists';
      if (userExists.email === email) errorMessage = 'Email already registered';
      if (userExists.username === username) errorMessage = 'Username already taken';
      if (userExists.mobileNumber === mobileNumber) errorMessage = 'Mobile number already registered';

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // 3. Secure the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    // No need for 'as any' casting anymore; TypeScript knows mobileNumber exists on IUser
    const user = await User.create({
      username,
      email,
      mobileNumber, 
      password: hashedPassword,
      domain,
      reason,
      hasSelection: false
    });

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        domain: user.domain,
        reason: user.reason,
        hasSelection: user.hasSelection
      }
    });

  } catch (error: any) {
    // Handle Mongoose validation errors (like regex mismatch for phone number)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}