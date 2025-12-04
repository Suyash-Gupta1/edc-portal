import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { sendStatusEmail } from '@/lib/mail';

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

    // 1. Fetch current user state BEFORE update to check if this is a promotion
    const currentUser = await User.findById(userId);
    
    if (!currentUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Determine hasSelection based on round (Round 4 = Selected)
    const hasSelection = round >= 4;

    // 2. Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { round: round, hasSelection: hasSelection },
      { new: true }
    );

    // 3. Send Email ONLY if the round has increased (Promotion)
    // We await this to ensure the serverless function doesn't terminate before sending
    if (round > currentUser.round) {
        console.log(`[Email Trigger] Promoting ${updatedUser.username} to Round ${round}`);
        try {
            await sendStatusEmail(
                updatedUser.email, 
                updatedUser.username, 
                round, 
                updatedUser.domain
            );
            console.log(`[Email Success] Sent to ${updatedUser.email}`);
        } catch (emailError) {
            console.error("[Email Failure]", emailError);
            // Non-blocking error for the API response, but logged.
        }
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}