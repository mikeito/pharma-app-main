import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from 'src/lib/jwt';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    verifyToken(token);
    return NextResponse.next(); // Allow the request to proceed
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/api/protected/:path*'], // Protect all routes under /api/protected
};
