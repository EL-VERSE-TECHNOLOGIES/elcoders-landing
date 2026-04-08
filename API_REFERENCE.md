# ELCODERS API Reference

Complete API documentation for the Korapay payment integration and utility functions.

## Table of Contents
1. [Payment APIs](#payment-apis)
2. [Utility Functions](#utility-functions)
3. [Webhook Handling](#webhook-handling)
4. [Error Handling](#error-handling)
5. [Examples](#examples)

---

## Payment APIs

### 1. Initialize Payment

**Endpoint**: `POST /api/korapay/initialize`

Initializes a payment transaction with Korapay.

#### Request

```typescript
interface InitializeRequest {
  email: string;           // Customer email (required)
  amount: number;          // Amount in NGN (required)
  reference: string;       // Unique reference (required)
  metadata?: {            // Additional data (optional)
    [key: string]: any;
  };
}
```

#### Example Request

```bash
curl -X POST http://localhost:3000/api/korapay/initialize \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "amount": 500,
    "reference": "elcoders_1234567890",
    "metadata": {
      "plan": "Professional",
      "plan_id": "professional"
    }
  }'
```

#### Example Request (JavaScript)

```typescript
const response = await fetch('/api/korapay/initialize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    amount: 500,
    reference: 'elcoders_1234567890',
    metadata: {
      plan: 'Professional',
      plan_id: 'professional',
    },
  }),
});

const data = await response.json();
```

#### Response (Success)

```json
{
  "success": true,
  "data": {
    "id": "charge_xxxxx",
    "reference": "elcoders_1234567890",
    "customer": {
      "email": "customer@example.com"
    },
    "amount": 50000,
    "currency": "NGN",
    "status": "pending",
    "checkout_url": "https://checkout.korapay.com/..."
  },
  "authorization_url": "https://checkout.korapay.com/..."
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Missing required fields"
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| 200  | Payment initialized successfully |
| 400  | Missing or invalid fields |
| 500  | Server error |

#### Notes

- Amount is in **NGN** (Nigerian Naira), NOT kobo
- Amount is automatically converted to kobo (×100) for Korapay API
- Reference must be unique per transaction
- Metadata is optional but recommended for tracking
- Customer is redirected to `authorization_url` to complete payment

---

### 2. Verify Payment

**Endpoint**: `GET /api/korapay/verify`

Retrieves payment status and details.

#### Query Parameters

```typescript
interface VerifyQuery {
  reference: string;  // Transaction reference (required)
}
```

#### Example Request

```bash
curl -X GET "http://localhost:3000/api/korapay/verify?reference=elcoders_1234567890"
```

#### Example Request (JavaScript)

```typescript
const reference = 'elcoders_1234567890';

const response = await fetch(`/api/korapay/verify?reference=${reference}`);
const data = await response.json();

console.log(data);
// {
//   "success": true,
//   "data": { ... },
//   "status": "success",
//   "amount": 50000,
//   "reference": "elcoders_1234567890"
// }
```

#### Response (Success)

```json
{
  "success": true,
  "data": {
    "id": "charge_xxxxx",
    "reference": "elcoders_1234567890",
    "customer": {
      "email": "customer@example.com"
    },
    "amount": 50000,
    "currency": "NGN",
    "status": "success",
    "metadata": {
      "plan": "Professional",
      "plan_id": "professional"
    },
    "created_at": "2024-01-15T10:30:00Z"
  },
  "status": "success",
  "amount": 50000,
  "reference": "elcoders_1234567890"
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Failed to verify payment"
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| 200  | Payment details retrieved |
| 400  | Missing reference parameter |
| 500  | Server error |

#### Payment Status Values

| Status | Meaning |
|--------|---------|
| pending | Payment awaiting completion |
| success | Payment completed successfully |
| failed | Payment failed |
| cancelled | Payment cancelled by user |

---

### 3. Webhook Handler

**Endpoint**: `POST /api/korapay/webhook`

Receives and processes payment notifications from Korapay.

#### Headers

```typescript
{
  "x-korapay-signature": "hmac_sha256_hash",
  "content-type": "application/json"
}
```

#### Request Body

```typescript
interface WebhookPayload {
  event: 'charge.success' | 'charge.failed' | 'charge.pending';
  data: {
    id: string;
    reference: string;
    customer: {
      email: string;
    };
    amount: number;
    currency: string;
    status: string;
    metadata: Record<string, any>;
    created_at: string;
  };
}
```

#### Example Webhook Event

```json
{
  "event": "charge.success",
  "data": {
    "id": "charge_xxxxx",
    "reference": "elcoders_1234567890",
    "customer": {
      "email": "customer@example.com"
    },
    "amount": 50000,
    "currency": "NGN",
    "status": "success",
    "metadata": {
      "plan": "Professional",
      "plan_id": "professional"
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Response

```json
{
  "success": true
}
```

#### Events Handled

| Event | Trigger |
|-------|---------|
| charge.success | Payment completed successfully |
| charge.failed | Payment failed |
| charge.pending | Payment status pending |

#### Signature Verification

```typescript
import crypto from 'crypto';

const signature = request.headers.get('x-korapay-signature');
const body = await request.text();
const secretKey = process.env.KORAPAY_SECRET_KEY;

const hash = crypto
  .createHmac('sha256', secretKey)
  .update(body)
  .digest('hex');

if (hash !== signature) {
  // Invalid signature - reject webhook
  return new Response('Unauthorized', { status: 401 });
}
```

#### Implementation Notes

- Always verify signature before processing
- Process events idempotently (safe to receive duplicates)
- Respond quickly (within 5 seconds)
- Store webhook data for audit trail
- Add email notifications here if needed

---

## Utility Functions

All utility functions are in `lib/korapay.ts`.

### 1. initializePayment()

Initialize a payment transaction from the frontend.

```typescript
// Usage
const response = await initializePayment({
  email: 'customer@example.com',
  amount: 500,
  reference: 'elcoders_1234567890',
  metadata: {
    plan: 'Professional'
  }
});

if (response.success && response.authorization_url) {
  window.location.href = response.authorization_url;
}
```

**Parameters**:
- `email` (string): Customer email
- `amount` (number): Amount in NGN
- `reference` (string): Unique reference
- `metadata` (object, optional): Additional data

**Returns**:
```typescript
{
  success: boolean;
  data?: {...};
  authorization_url?: string;
  error?: string;
}
```

### 2. verifyPayment()

Verify a payment transaction.

```typescript
// Usage
const response = await verifyPayment('elcoders_1234567890');

if (response.success) {
  console.log('Payment status:', response.data?.status);
}
```

**Parameters**:
- `reference` (string): Transaction reference

**Returns**:
```typescript
{
  success: boolean;
  data?: {...};
  status?: string;
  amount?: number;
  reference?: string;
  error?: string;
}
```

### 3. generatePaymentReference()

Generate a unique payment reference.

```typescript
// Usage
const reference = generatePaymentReference();
// Output: "elcoders_1234567890_a1b2c3d4"

const reference = generatePaymentReference('custom');
// Output: "custom_1234567890_a1b2c3d4"
```

**Parameters**:
- `prefix` (string, optional): Reference prefix (default: 'elcoders')

**Returns**:
- `string`: Unique reference

### 4. formatAmount()

Format amount from kobo to NGN display format.

```typescript
// Usage
const display = formatAmount(50000);
// Output: "₦500.00"

const display = formatAmount(150000);
// Output: "₦1,500.00"
```

**Parameters**:
- `kobo` (number): Amount in kobo

**Returns**:
- `string`: Formatted amount with NGN symbol

### 5. isValidEmail()

Validate email address format.

```typescript
// Usage
isValidEmail('user@example.com');    // true
isValidEmail('invalid.email');       // false
isValidEmail('user@example');        // false
```

**Parameters**:
- `email` (string): Email to validate

**Returns**:
- `boolean`: Valid or invalid

### 6. isValidAmount()

Validate payment amount.

```typescript
// Usage
isValidAmount(500);      // true
isValidAmount(0);        // false
isValidAmount(-100);     // false
isValidAmount(Infinity); // false
```

**Parameters**:
- `amount` (number): Amount to validate

**Returns**:
- `boolean`: Valid or invalid

### 7. handlePaymentRedirect()

Complete payment flow with validation.

```typescript
// Usage
try {
  const url = await handlePaymentRedirect(
    'customer@example.com',
    500,
    'professional',
    'Professional'
  );
  window.location.href = url;
} catch (error) {
  console.error(error.message);
}
```

**Parameters**:
- `email` (string): Customer email
- `amount` (number): Amount in NGN
- `planId` (string): Plan ID
- `planName` (string): Plan name

**Returns**:
- `Promise<string | null>`: Checkout URL

**Throws**:
- Error if validation fails or payment init fails

### 8. parseWebhookPayload()

Parse webhook JSON payload.

```typescript
// Usage
const payload = parseWebhookPayload(webhookBody);

console.log(payload.event);        // "charge.success"
console.log(payload.data.amount);  // 50000
```

**Parameters**:
- `body` (string): Raw webhook body

**Returns**:
```typescript
{
  event: string;
  data: {...};
}
```

---

## Webhook Handling

### Complete Webhook Implementation

```typescript
// app/api/korapay/webhook/route.ts

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
    const body = await request.text();
    const signature = request.headers.get('x-korapay-signature') || '';

    // Verify signature
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);
    const { event, data: eventData } = data;

    // Handle events
    switch (event) {
      case 'charge.success':
        // TODO: Update database, send email, etc.
        console.log('Payment successful:', eventData.reference);
        break;

      case 'charge.failed':
        // TODO: Update database with failed status
        console.log('Payment failed:', eventData.reference);
        break;

      default:
        console.log('Unknown event:', event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Missing required fields | Empty email/amount | Validate input |
| Invalid email format | Bad email | Use `isValidEmail()` |
| Invalid amount | ≤0 or non-number | Use `isValidAmount()` |
| Invalid signature | Tampered webhook | Re-verify signature |
| Payment init failed | API error | Check Korapay keys |

### Error Response Format

```typescript
{
  success: false,
  error: "Error message describing what went wrong"
}
```

### Handling Errors in Frontend

```typescript
try {
  const response = await initializePayment({
    email: userEmail,
    amount: selectedAmount,
    reference: generatePaymentReference(),
  });

  if (!response.success) {
    console.error('Error:', response.error);
    alert('Payment failed: ' + response.error);
    return;
  }

  // Redirect to payment
  window.location.href = response.authorization_url;

} catch (error) {
  console.error('Unexpected error:', error);
  alert('An unexpected error occurred');
}
```

### Handling Errors in Webhook

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-korapay-signature') || '';

    // Verify
    if (!verifyWebhookSignature(body, signature)) {
      console.warn('Invalid signature from webhook');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Process
    const data = JSON.parse(body);
    // ... handle event ...

    return NextResponse.json({ success: true });

  } catch (error) {
    // Log error but still return 200 to Korapay
    console.error('Webhook processing error:', error);
    return NextResponse.json({ success: true }); // Korapay expects 200
  }
}
```

---

## Examples

### Example 1: Complete Payment Flow

```typescript
// components/pricing.tsx

async function handlePayment(planId: string, email: string) {
  // Validate
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email');
    return;
  }

  const plan = plans.find(p => p.id === planId);
  if (!plan) return;

  try {
    // Initialize payment
    const reference = generatePaymentReference();
    const response = await initializePayment({
      email,
      amount: plan.price / 100, // kobo to naira
      reference,
      metadata: {
        plan_id: planId,
        plan_name: plan.name,
      },
    });

    if (response.success && response.authorization_url) {
      // Redirect to payment
      window.location.href = response.authorization_url;
    } else {
      alert('Payment initialization failed');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('An error occurred. Please try again.');
  }
}
```

### Example 2: Success Page Verification

```typescript
// app/payment/success/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verify = async () => {
      const response = await verifyPayment(reference);
      setStatus(response.success ? 'success' : 'error');
    };

    verify();
  }, [reference]);

  return (
    <div>
      {status === 'loading' && <p>Verifying...</p>}
      {status === 'success' && <p>Payment successful!</p>}
      {status === 'error' && <p>Payment verification failed</p>}
    </div>
  );
}
```

### Example 3: Custom Integration

```typescript
// Integrate payment into custom form

import { handlePaymentRedirect } from '@/lib/korapay';

async function submitForm(formData: FormData) {
  const email = formData.get('email');
  const plan = formData.get('plan');

  try {
    const url = await handlePaymentRedirect(
      email,
      plan.price / 100,
      plan.id,
      plan.name
    );
    window.location.href = url;
  } catch (error) {
    console.error('Payment error:', error);
  }
}
```

---

## Testing the API

### Using cURL

```bash
# Initialize payment
curl -X POST http://localhost:3000/api/korapay/initialize \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "amount": 500,
    "reference": "test_123"
  }'

# Verify payment
curl http://localhost:3000/api/korapay/verify?reference=test_123
```

### Using Postman

1. Create new request
2. Set method to POST
3. Set URL to `http://localhost:3000/api/korapay/initialize`
4. Set Content-Type header to `application/json`
5. Add body:
```json
{
  "email": "test@example.com",
  "amount": 500,
  "reference": "test_123"
}
```
6. Send

---

## Rate Limiting

Currently no built-in rate limiting. Add if needed:

```typescript
// lib/rate-limit.ts
const requests = new Map();

export function checkRateLimit(ip: string, limit = 100): boolean {
  const now = Date.now();
  const userRequests = requests.get(ip) || [];
  const recent = userRequests.filter(t => now - t < 60000);
  
  if (recent.length >= limit) return false;
  
  recent.push(now);
  requests.set(ip, recent);
  return true;
}
```

---

## Security Best Practices

1. ✅ Always verify webhook signatures
2. ✅ Use environment variables for secrets
3. ✅ Validate all input
4. ✅ Use HTTPS in production
5. ✅ Log all transactions
6. ✅ Implement rate limiting
7. ✅ Sanitize error messages
8. ✅ Don't expose internal errors

---

**API Reference Complete!**

For more information, see:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick start guide
- `lib/korapay.ts` - Source code
- Korapay Docs: https://docs.korapay.com
