import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

const ADMIN_KEY = "EDC_ADMIN_2024";

export async function POST(req: Request) {
  await dbConnect();

  const apiKey = req.headers.get('admin-key');

  if (apiKey !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { userId, round } = body;

    if (!userId || typeof round !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Determine hasSelection based on round (Round 4 = Selected)
    const hasSelection = round >= 4;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { round: round, hasSelection: hasSelection },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}