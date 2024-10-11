import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { pathname, searchParams, host } = req.nextUrl;

  // 응답 결과를 브라우저에 전달
  return NextResponse.json({
    pathname,
    host,
    q: searchParams.get('q'),
    ip: req.ip || '127.0.0.1',
    // cookies: req.cookies.getAll(),
  });
}
