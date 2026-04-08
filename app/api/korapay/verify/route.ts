import { NextRequest, NextResponse } from 'next/server';

const KORAPAY_API_URL = 'https://api.korapay.com/v1';
const SECRET_KEY = process.env.KORAPAY_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${KORAPAY_API_URL}/charges/${reference}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to verify payment' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      status: data.data?.status,
      amount: data.data?.amount,
      reference: data.data?.reference,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
