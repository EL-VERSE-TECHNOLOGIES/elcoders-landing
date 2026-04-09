import { NextRequest, NextResponse } from 'next/server';

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

    // TODO: Save to database
    // For now, we'll just log it
    console.log('New booking:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      date: body.date,
      time: body.time,
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        name: body.name,
        email: body.email,
        date: body.date,
        time: body.time,
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
