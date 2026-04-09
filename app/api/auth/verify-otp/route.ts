import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify OTP
    const result = verifyOTP(body.email, body.otp);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || 'Invalid OTP' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        email: body.email,
        verified: true,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to verify OTP',
      },
      { status: 500 }
    );
  }
}
