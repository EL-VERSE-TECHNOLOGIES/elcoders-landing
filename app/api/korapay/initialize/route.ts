import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const KORAPAY_API_URL = 'https://api.korapay.com/v1';
const SECRET_KEY = process.env.KORAPAY_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, amount, reference, metadata } = body;

    if (!email || !amount || !reference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payload = {
      reference,
      amount: Math.round(amount * 100), // Convert to kobo
      currency: 'NGN',
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/korapay/webhook`,
      metadata: {
        email,
        ...metadata,
      },
    };

    const response = await fetch(
      `${KORAPAY_API_URL}/charges/initialize`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SECRET_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response from Korapay:', text);
      return NextResponse.json(
        { error: 'Invalid response from payment processor' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to initialize payment' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      authorization_url: data.data?.checkout_url,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
