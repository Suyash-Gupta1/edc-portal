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
    const { userId, round, applicationStatus } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updates: any = {};
    
    // Handle Round Update
    if (typeof round === 'number') {
        updates.round = round;
        updates.hasSelection = round >= 4;
    }

    // Handle Status Update (Active/Rejected)
    if (applicationStatus) {
        updates.applicationStatus = applicationStatus;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    );

    // Send Email Logic (Only for promotions or selection)
    // We don't automate rejection emails to allow for personal checks, but we do promote active rounds
    if (typeof round === 'number' && round > currentUser.round && updatedUser.applicationStatus === 'active') {
        console.log(`[Email Trigger] Promoting ${updatedUser.username} to Round ${round}`);
        try {
            await sendStatusEmail(
                updatedUser.email, 
                updatedUser.username, 
                round, 
                updatedUser.domain
            );
        } catch (emailError) {
            console.error("[Email Failure]", emailError);
        }
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}