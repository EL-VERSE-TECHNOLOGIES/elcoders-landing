import { NextRequest, NextResponse } from 'next/server';
import {
  sendWelcomeEmail,
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail,
} from '@/lib/mailer';

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message?: string;
  amount?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.date || !body.time || !body.service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Send emails in parallel
    const [welcomeEmailResult, confirmationEmailResult, adminNotificationResult] = await Promise.all([
      // 1. Send welcome email immediately (0 min after signup)
      sendWelcomeEmail({
        name: body.name,
        email: body.email,
        amount: body.amount,
      }),
      
      // 2. Send booking confirmation to client
      sendBookingConfirmationEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time,
        message: body.message,
      }),
      
      // 3. Send admin notification
      sendAdminNotificationEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time,
        message: body.message,
      }),
    ]);

    // Check if all emails were sent successfully
    const allSuccessful = welcomeEmailResult.success && confirmationEmailResult.success && adminNotificationResult.success;

    if (!allSuccessful) {
      console.warn('Some emails failed to send:', {
        welcomeEmail: welcomeEmailResult,
        confirmationEmail: confirmationEmailResult,
        adminNotification: adminNotificationResult,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully. Welcome email sent.',
      booking: {
        name: body.name,
        email: body.email,
        date: body.date,
        time: body.time,
      },
      emailStatus: {
        welcomeEmail: welcomeEmailResult.success,
        confirmationEmail: confirmationEmailResult.success,
        adminNotification: adminNotificationResult.success,
      },
    });
  } catch (error) {
    console.error('Booking error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create booking',
      },
      { status: 500 }
    );
  }
}
