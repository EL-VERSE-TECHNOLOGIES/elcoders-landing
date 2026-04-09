# ELCODERS - Premium Digital Solutions Landing Page

A modern, fully-functional landing page with integrated Korapay payment processing, email capabilities, and OTP verification. Built with Next.js 16, React, Tailwind CSS, TypeScript, and featuring multiple sections including pricing with payment processing.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with beautiful dark theme
- **8 Main Sections**:
  1. Navigation Bar - Fixed navbar with mobile menu
  2. Hero Section - Eye-catching hero with stats
  3. Features/Services - Showcase of offerings
  4. Pricing Plans - Three-tier pricing with Korapay payment integration
  5. Development Timeline - 4-phase project workflow
  6. FAQ Section - Common questions with accordion
  7. Footer - Complete footer with links
  
- **Interactive Elements**:
  - Smooth scrolling navigation
  - Animated price cards
  - Accordion FAQs
  - Email collection for plans
  - Promo code support (placeholder)

### Backend Features

**Korapay Payment Integration**
- **Initialize Transaction** (`/api/korapay/initialize`)
  - Creates Korapay payment transaction
  - Accepts email, amount, reference, and metadata
  - Returns checkout URL for customer

- **Verify Payment** (`/api/korapay/verify`)
  - Validates payment status
  - Returns transaction details
  - Query parameter: `reference`

- **Webhook Handler** (`/api/korapay/webhook`)
  - Receives payment notifications from Korapay
  - Validates webhook signatures using HMAC-SHA256
  - Handles events: `charge.success`, `charge.failed`, `charge.pending`

**Authentication & Email**
- **OTP System** (`/api/auth/*`)
  - Generate OTP via `/request-otp` endpoint
  - Verify OTP via `/verify-otp` endpoint
  - Client and Developer signup flows
  - Email delivery via Nodemailer

- **Email Service**
  - Nodemailer integration for reliable email delivery
  - OTP verification emails
  - Account confirmation emails
  - Newsletter signup support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Payment**: Korapay API
- **Email**: Nodemailer 6.9.8
- **Authentication**: OTP verification system
- **UI Components**: Radix UI + Shadcn/ui
- **Deployment**: Vercel

## Environment Variables

Required environment variables (set in Vercel project settings):

```env
NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_kM7m7BBtdH1Af514QMna1xHxLM8v1vutv72sWpNk
KORAPAY_SECRET_KEY=sk_live_e9tiXn1oqUAPpT23YRF3BJPewmGKksuhkdEDPigu
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main landing page
│   ├── globals.css               # Global styles
│   ├── api/
│   │   └── korapay/
│   │       ├── initialize/route.ts   # Initialize payment
│   │       ├── verify/route.ts       # Verify payment
│   │       └── webhook/route.ts      # Handle webhooks
│   └── payment/
│       └── success/page.tsx       # Payment success page
├── components/
│   ├── navbar.tsx                # Navigation component
│   ├── hero.tsx                  # Hero section
│   ├── features.tsx              # Services/features
│   ├── pricing.tsx               # Pricing plans with payment
│   ├── timeline.tsx              # Development timeline
│   ├── faq.tsx                   # FAQ accordion
│   └── footer.tsx                # Footer
```

## Payment Flow

1. User selects a pricing plan
2. Enters email address
3. Clicks "Proceed to Payment"
4. Frontend calls `/api/korapay/initialize` with plan details
5. Receives checkout URL from Korapay
6. User is redirected to Korapay payment page
7. After payment, redirected to `/payment/success?reference=...`
8. Frontend verifies payment via `/api/korapay/verify`
9. Webhook notification sent to `/api/korapay/webhook` (for background processing)

## Pricing Plans

### Starter - ₦50,000
- Up to 5 pages
- Basic SEO optimization
- Mobile responsive
- 3 months support
- Free hosting for 1 year

### Professional - ₦150,000 (Recommended)
- Up to 20 pages
- Advanced SEO
- E-commerce integration
- 12 months support
- SSL & security setup
- Performance optimization

### Enterprise - ₦500,000
- Unlimited pages
- Custom development
- AI integration
- 24/7 priority support
- Dedicated team
- Advanced analytics
- White-label options

## Development Timeline

All projects follow a 4-phase development approach:

1. **Discovery & Planning** (1-2 weeks)
   - Requirements gathering
   - Market research
   - Technical planning
   - Timeline creation

2. **Design & Prototyping** (2-3 weeks)
   - Wireframing
   - Visual design
   - Interactive prototypes
   - Client feedback

3. **Development** (4-8 weeks)
   - Frontend development
   - Backend development
   - Integration
   - Testing

4. **Launch & Support** (Ongoing)
   - Deployment
   - Performance optimization
   - Monitoring
   - Post-launch support

## Security Features

- **Webhook Signature Validation**: HMAC-SHA256 verification of webhook requests
- **Server-Side Validation**: All payment operations secured on backend
- **Environment Variables**: Sensitive keys stored securely
- **CORS Protection**: Proper API security headers
- **Input Validation**: Email and amount validation

## Customization

### Modifying Plans
Edit pricing details in `components/pricing.tsx`:
```tsx
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 50000,  // in kobo (₦500 = 50000 kobo)
    // ...
  }
];
```

### Changing Colors
The design uses a blue-cyan gradient theme. Modify Tailwind classes:
- `from-blue-500 to-cyan-500` - Primary gradient
- `bg-slate-950` - Dark background
- `text-cyan-400` - Accent text

### Adding Sections
Create new component in `components/` and import in `app/page.tsx`:
```tsx
import { YourComponent } from '@/components/your-component';

export default function Home() {
  return (
    <main>
      {/* existing components */}
      <YourComponent />
    </main>
  );
}
```

## API Documentation

### POST /api/korapay/initialize
Initialize a payment transaction.

**Request:**
```json
{
  "email": "customer@example.com",
  "amount": 500,
  "reference": "elcoders_1234567890",
  "metadata": {
    "plan": "Professional",
    "plan_id": "professional"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* full Korapay response */ },
  "authorization_url": "https://checkout.korapay.com/..."
}
```

### GET /api/korapay/verify?reference=elcoders_1234567890
Verify payment status.

**Response:**
```json
{
  "success": true,
  "data": { /* transaction details */ },
  "status": "success",
  "amount": 50000,
  "reference": "elcoders_1234567890"
}
```

### POST /api/korapay/webhook
Receive payment notifications from Korapay.

**Headers:**
```
x-korapay-signature: <HMAC-SHA256 hash>
```

**Payload:**
```json
{
  "event": "charge.success",
  "data": { /* transaction details */ }
}
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel Settings:
   - `NEXT_PUBLIC_KORAPAY_PUBLIC_KEY`
   - `KORAPAY_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

## Future Enhancements

- [ ] Email notifications for successful payments
- [ ] Admin dashboard for order management
- [ ] Customer portal with project status
- [ ] Email templates for confirmations
- [ ] Analytics dashboard
- [ ] Blog section
- [ ] Team/testimonials section
- [ ] Live chat widget integration (Calendly linking mentioned)

## Support

For issues or questions:
1. Check the FAQ section on the landing page
2. Review the API documentation above
3. Check Korapay API docs: https://docs.korapay.com
4. Contact ELCODERS support

## License

© 2024 ELCODERS. All rights reserved.
