import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    
    
    let { username, email, mobileNumber, phone, password, domain, reason } = body;

    
    if (!mobileNumber && phone) {
        mobileNumber = phone;
    }

    
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

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
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
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}