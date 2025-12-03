import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: "Domains are static and not served from this API." }, 
    { status: 404 }
  );
}