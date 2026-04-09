import { NextRequest, NextResponse } from 'next/server';
import { createOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/mailer';

interface RequestOTPRequest {
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestOTPRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
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

    // Generate OTP
    const otp = createOTP(body.email);

    // Send OTP email
    const emailResult = await sendOTPEmail(body.email, body.name, otp);

    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        email: body.email,
        expiresIn: '10 minutes',
      },
    });
  } catch (error) {
    console.error('Request OTP error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to request OTP',
      },
      { status: 500 }
    );
  }
}
