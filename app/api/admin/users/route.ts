import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';


const ADMIN_KEY =  process.env.ADMIN_KEY || "";

export const dynamic = 'force-dynamic'; 

export async function GET(req: Request) {
  await dbConnect();

  const apiKey = req.headers.get('admin-key');

  if (apiKey !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
   
    const users = await User.find({}).sort({ round: -1, createdAt: -1 }).lean();
    
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}