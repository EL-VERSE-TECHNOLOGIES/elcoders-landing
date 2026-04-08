# Environment Variables Setup Guide

## Required Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

### Korapay Payment Integration
```
NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_kM7m7BBtdH1Af514QMna1xHxLM8v1vutv72sWpNk
KORAPAY_SECRET_KEY=sk_live_e9tiXn1oqUAPpT23YRF3BJPewmGKksuhkdEDPigu
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Email Configuration (for booking notifications)
```
EMAIL_USER=elcoderssofwares12@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

## How to Get Gmail App Password

1. Go to https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Search for "App passwords"
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password
7. Copy and paste it as EMAIL_PASSWORD

## Local Development (.env.local)

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_kM7m7BBtdH1Af514QMna1xHxLM8v1vutv72sWpNk
KORAPAY_SECRET_KEY=sk_live_e9tiXn1oqUAPpT23YRF3BJPewmGKksuhkdEDPigu
NEXT_PUBLIC_APP_URL=http://localhost:3000
EMAIL_USER=elcoderssofwares12@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

## Testing Korapay Integration

1. Payment initialization endpoint: `POST /api/korapay/initialize`
2. Webhook endpoint: `POST /api/korapay/webhook`
3. Verify endpoint: `GET /api/korapay/verify?reference=<ref>`

## WhatsApp Links

- **Payment Only**: https://wa.link/aps8r5
- **Inquiries & Support**: https://wa.link/oktez7

These links are embedded in:
- CTA sections
- Pricing cards
- Booking confirmation
- Footer
- FAQ

## Verify Setup

After deploying, check:

✓ Favicon loads correctly
✓ Logo appears in navbar
✓ Korapay payment buttons work
✓ Booking form sends emails
✓ Privacy policy loads
✓ Terms of service loads
✓ All WhatsApp links working
✓ Payment success page redirects to WhatsApp
