import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Handle API routes first
    if (pathname.startsWith('/api')) {
      // Allow auth routes
      if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
      }
      
      // Protect other API routes
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      return NextResponse.next();
    }

    // Redirect to login if no token for non-API routes
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Admin routes protection
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Team leader routes protection
    if (pathname.startsWith('/team-leader') && !['admin', 'team-leader'].includes(token.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Employee routes protection
    if (pathname.startsWith('/employee') && !['admin', 'team-leader', 'employee'].includes(token.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Profile route - accessible to all authenticated users
    if (pathname.startsWith('/profile')) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // Always return true to let the middleware handle unauthorized requests.
        // Otherwise next-auth defaults to redirecting all unauthorized API requests to the signin page, resulting in HTML responses.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/team-leader/:path*',
    '/employee/:path*',
    '/profile/:path*',
    '/api/:path*',
  ],
};
