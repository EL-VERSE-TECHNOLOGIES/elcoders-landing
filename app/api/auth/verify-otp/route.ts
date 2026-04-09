import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'OTP system has been disabled' },
    { status: 410 } // 410 Gone
  );
}
