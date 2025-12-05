import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// In a real app, store this in .env
const ADMIN_KEY = "EDC_ADMIN_2024";

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this route

export async function GET(req: Request) {
  await dbConnect();

  const apiKey = req.headers.get('admin-key');

  if (apiKey !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all users, sort by round (descending) then date
    // .lean() converts Mongoose documents to plain JS objects, which is faster and ensures full field visibility
    const users = await User.find({}).sort({ round: -1, createdAt: -1 }).lean();
    
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}