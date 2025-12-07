
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  try {
    
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