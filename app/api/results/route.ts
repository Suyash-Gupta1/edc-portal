// FIX: Use relative paths to ensure DB connection works
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  try {
    // 1. Fetch users.
    // NOTE: If you don't see anyone, it's likely because everyone is 'round: 0'.
    // Change $gte: 1 to $gte: 0 temporarily to see if fetching works at all.
    const users = await User.find({ round: { $gte: 1 } })
      .select('username email domain round hasSelection')
      .sort({ round: -1, username: 1 })
      .lean();

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("[API/Results] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}