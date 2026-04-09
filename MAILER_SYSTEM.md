# Mailer System Documentation

## Overview

The ELCODERS mailer system provides a centralized, maintainable way to manage all email communications. It includes:

1. **Email Service** (`lib/mailer.ts`) - Core email sending functionality
2. **Email Templates** (`lib/email-templates.ts`) - Pre-built, styled email templates
3. **Integrated Booking Route** - Automatic email sending on bookings

## Features

### ✅ Welcome Email (Immediate - 0 min after signup)
Sent immediately upon signup completion with:
- Kickoff call scheduling link
- Pre-call preparation instructions
- Discount code (ELVERSE40 - 40% off for 7 days)
- Contact information

### ✅ Booking Confirmation Email
Sent to the client with:
- Complete appointment details
- Contact information
- Next steps
- Quick links to contact channels

### ✅ Admin Notification Email
Sent to admin with:
- Client details
- Booking information
- Project details
- Call-to-action to reach out to client

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` or Vercel deployment:

```bash
EMAIL_USER=elcoderssofwares12@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**How to get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Copy the generated 16-character password
4. Use it as `EMAIL_PASSWORD`

### 2. Dependencies

Nodemailer is already installed:
```json
{
  "nodemailer": "^6.9.8",
  "@types/nodemailer": "^6.4.14"
}
```

## Usage

### Sending Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/mailer';

await sendWelcomeEmail({
  name: 'John Doe',
  email: 'john@example.com',
  amount: '50', // Optional: payment amount per day
});
```

### Sending Booking Confirmation

```typescript
import { sendBookingConfirmationEmail } from '@/lib/mailer';

await sendBookingConfirmationEmail({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  service: 'Development',
  date: '2026-04-15',
  time: '2:00 PM',
  message: 'Project details...', // Optional
});
```

### Sending Admin Notification

```typescript
import { sendAdminNotificationEmail } from '@/lib/mailer';

await sendAdminNotificationEmail({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  service: 'Development',
  date: '2026-04-15',
  time: '2:00 PM',
  message: 'Project details...', // Optional
});
```

### Sending Raw Email

```typescript
import { sendEmail } from '@/lib/mailer';

await sendEmail({
  to: 'recipient@example.com',
  subject: 'Custom Subject',
  html: '<h1>Custom HTML</h1>',
});
```

## API Endpoint

The booking endpoint now automatically sends all emails:

**POST** `/api/booking`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "date": "2026-04-15",
  "time": "2:00 PM",
  "service": "Development",
  "message": "Project details (optional)",
  "amount": "50 (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully. Welcome email sent.",
  "booking": {
    "name": "John Doe",
    "email": "john@example.com",
    "date": "2026-04-15",
    "time": "2:00 PM"
  },
  "emailStatus": {
    "welcomeEmail": true,
    "confirmationEmail": true,
    "adminNotification": true
  }
}
```

## Email Templates

All templates are professional, responsive, and use consistent branding:

### Template Structure

```
├── Header (with gradient background)
├── Content (main email body)
├── Footer (with branding and links)
└── Responsive design for mobile/desktop
```

### Customization

To customize a template, edit `lib/email-templates.ts`:

```typescript
export const emailTemplates = {
  welcomeEmail: (userName: string, amount?: string) => {
    const content = `
      <!-- Your custom HTML here -->
    `;
    return emailBase(content);
  },
};
```

## Troubleshooting

### Email Not Sending

1. **Check Environment Variables**
   ```bash
   echo $EMAIL_USER
   echo $EMAIL_PASSWORD
   ```

2. **Check Logs**
   ```bash
   npm run dev
   # Look for email sending logs
   ```

3. **Gmail Can't Send?**
   - Ensure 2FA is enabled on your Gmail account
   - Generate a new app password
   - Less secure apps must be disabled (use app passwords)

### Email Styling Issues

- Most issues are due to email client limitations
- Test in [Litmus](https://litmus.com/) or [Email on Acid](https://www.emailonacid.com/)
- Inline CSS is recommended for better compatibility

## Adding New Email Templates

To add a new email template:

1. Create the template function in `lib/email-templates.ts`
2. Wrap it with `emailBase(content)`
3. Use in your code via `sendEmail()`

Example:
```typescript
export const emailTemplates = {
  customEmail: (name: string, data: string) => {
    const content = `
      <div class="header">
        <h1>Custom Email</h1>
      </div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>${data}</p>
      </div>
    `;
    return emailBase(content);
  },
};
```

## Performance Notes

- All emails are sent in parallel using `Promise.all()`
- Email sending doesn't block the API response
- Emails are sent with error handling and logging
- Email failures don't fail the entire booking (graceful degradation)

## Files

- **`lib/mailer.ts`** - Core email service
- **`lib/email-templates.ts`** - Email templates and styles
- **`app/api/booking/route.ts`** - Booking API with integrated emails

---

**Last Updated**: April 9, 2026
