import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_KEY = process.env.KORAPAY_SECRET_KEY;

function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac('sha256', SECRET_KEY || '')
    .update(payload)
    .digest('hex');
  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-korapay-signature') || '';

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.warn('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);
    const { event, data: eventData } = data;

    console.log('[Korapay Webhook]', event, eventData);

    // Handle different webhook events
    switch (event) {
      case 'charge.success':
        // Process successful payment
        console.log('Payment successful:', eventData.reference);
        // TODO: Update your database, send confirmation email, etc.
        break;

      case 'charge.failed':
        // Handle failed payment
        console.log('Payment failed:', eventData.reference);
        // TODO: Update your database with failed status
        break;

      case 'charge.pending':
        // Handle pending payment
        console.log('Payment pending:', eventData.reference);
        break;

      default:
        console.log('Unknown event:', event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
