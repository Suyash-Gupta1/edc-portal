import dbConnect from '@/lib/db';
import RoundSchedule from '@/models/RoundSchedule';
import { NextResponse } from 'next/server';

const ADMIN_KEY = "EDC_ADMIN_2024";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  await dbConnect();
  const apiKey = req.headers.get('admin-key');
  if (apiKey !== ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
      const schedules = await RoundSchedule.find({}).sort({ round: 1 });
      return NextResponse.json({ success: true, schedules });
  } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const apiKey = req.headers.get('admin-key');
  if (apiKey !== ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
      const body = await req.json();
      
      
      if (body.schedules && Array.isArray(body.schedules)) {
          for (const s of body.schedules) {
              await RoundSchedule.findOneAndUpdate(
                  { round: s.round },
                  { description: s.description, updatedAt: new Date() },
                  { upsert: true, new: true }
              );
          }
          return NextResponse.json({ success: true });
      }

      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 });
  }
}