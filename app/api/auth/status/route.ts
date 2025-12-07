import dbConnect from '@/lib/db';
import User from '@/models/User';
import RoundSchedule from '@/models/RoundSchedule';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Determine the relevant schedule
    // If user is in Round 0 (Applied), they need schedule for Round 1.
    // If user is in Round 1 (Completed R1), they need schedule for Round 2.
    const nextRound = user.round + 1;
    
    // Fetch global schedule for this next round
    const scheduleDoc = await RoundSchedule.findOne({ round: nextRound });
    const scheduleDescription = scheduleDoc ? scheduleDoc.description : "";

    return NextResponse.json({
      success: true,
      status: {
        round: user.round,
        hasSelection: user.hasSelection,
        domain: user.domain,
        applicationStatus: user.applicationStatus || 'active',
        scheduleDescription: scheduleDescription 
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}