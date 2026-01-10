import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const ADMIN_KEY = process.env.ADMIN_KEY || "";


const WINDOW_MS = 60 * 1000; 
const AUTH_LIMIT = 5;        
const GENERIC_LIMIT = 100;   


const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export const config = {
  
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');

  
  if (pathname.startsWith('/api')) {
    const limit = pathname.startsWith('/api/auth') ? AUTH_LIMIT : GENERIC_LIMIT;
    const currentTime = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, lastReset: currentTime };

    if (currentTime - record.lastReset > WINDOW_MS) {
      record.count = 0;
      record.lastReset = currentTime;
    }

    if (record.count >= limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    record.count += 1;
    rateLimitMap.set(ip, record);
    
    
    if (pathname.startsWith('/api/admin')) {
        const apiKey = request.headers.get('admin-key');
        if (apiKey !== ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }
    
    return response; 
  }

  
  const token = request.cookies.get("token")?.value;
  
  
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL("/", request.url));

    try {
      
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (!payload.isAdmin) {
        
        return NextResponse.redirect(new URL("/status", request.url));
      }
      return NextResponse.next(); 

    } catch (err) {
     
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const protectedPaths = ['/status', '/results', '/profile'];
  
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  }

  return NextResponse.next();
}
