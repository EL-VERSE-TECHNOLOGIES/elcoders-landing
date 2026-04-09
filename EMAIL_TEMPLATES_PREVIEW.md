# 📨 EMAIL TEMPLATES - EXACT PREVIEW

## EMAIL 1: OTP Verification

**To:** user@example.com  
**Subject:** Verify Your Email - ELCODERS Signup  
**Sent:** Within 10 seconds of request

```
═══════════════════════════════════════════════════
                    ELCODERS
                Verify Your Email 🔐
         Your one-time password
═══════════════════════════════════════════════════

Hi John,

To complete your signup with ELCODERS, please verify 
your email address using the code below:

┌──────────────────────────┐
│  Your Verification Code  │
│                          │
│   1 2 3 4 5 6            │  (6-digit code)
│                          │
│   Valid for 10 minutes   │
└──────────────────────────┘

⏱️ This code expires in 10 minutes
If you didn't request this code, you can safely 
ignore this email.

What happens next?
→ After verifying your email
→ You'll be welcomed to ELCODERS
→ Receive your kickoff call link
→ Get the ELVERSE40 discount code (40% off)
→ Start shipping code within 24 hours

⚠️ Security Note: 
Never share your verification code with anyone. 
ELCODERS will never ask for your code via email, 
phone, or social media.

═══════════════════════════════════════════════════
            ELCODERS - Daily Velocity, Zero Fluff
          © 2026 EL VERSE TECHNOLOGIES
═══════════════════════════════════════════════════
```

---

## EMAIL 2: Welcome/Kickoff Onboarding

**To:** user@example.com  
**Subject:** Welcome to ELCODERS – Your Kickoff Call & Next Steps  
**Sent:** Immediately after signup

```
═══════════════════════════════════════════════════
                  [ELCODERS LOGO]
               Welcome to ELCODERS
               You're in. Let's ship code.
═══════════════════════════════════════════════════

Hi John,

You're in. Welcome to ELCODERS.

Here's what happens next:

┌───────────────────────────────────────────────────┐
│ 📅 STEP 1: Your Kickoff Call                     │
│                                                  │
│ https://calendly.com/elcoderssoftwares12/30min  │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│ ⏱️ STEP 2: Before the Call (5 min prep)          │
│                                                  │
│ • Have your GitHub/Lab repo URL ready           │
│ • Know the ONE bug or task you want fixed first │
│ • That's it. No SOW. No paperwork.              │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│ 🎁 STEP 3: Your Discount                         │
│                                                  │
│ Code ELVERSE40 is active                        │
│ First 7 days at 40% off.                        │
│                                                  │
│ Your card will be charged $50/day               │
│ starting tomorrow.                              │
└───────────────────────────────────────────────────┘

📞 Need to reschedule?

Schedule: https://calendly.com/elcoderssoftwares12/30min
Website:  https://elcoders-devs.vercel.app/

───────────────────────────────────────────────────

Talk soon,

Cebastian Jerry
Sales, ELCODERS
EL VERSE TECHNOLOGIES

═══════════════════════════════════════════════════
              ELCODERS
         Daily Velocity. Zero Fluff.

WhatsApp | Twitter | Website

© 2026 EL VERSE TECHNOLOGIES. All rights reserved.
═══════════════════════════════════════════════════
```

---

## Email Design Details

### Color Scheme
- **Primary Blue:** #0ea5e9 (headers, links, CTAs)
- **Light Blue Background:** #f8fcff (step containers)
- **Text Color:** #1e293b (dark text)
- **Subtle Gray:** #666666 (secondary text)
- **White:** #ffffff (main background)

### Typography
- **Header:** 24-28px bold, blue, white text on blue background
- **Subheading:** 16px, blue color
- **Body:** 14-15px, dark gray
- **Emphasis:** Bold for important details

### Structure
```
Header (Blue background with logo)
  ↓
Greeting (Hi [Name])
  ↓
Introduction (Context sentence)
  ↓
Main Content
  - Steps/Sections in boxes
  - Clear CTAs
  - Important information highlighted
  ↓
Closing (Personalized signature)
  ↓
Footer (Branding + links + copyright)
```

### Responsive Design
- Mobile: 100% width, proper text wrapping
- Tablet: 90% width, balanced padding
- Desktop: 600px max-width, centered
- All links clickable on mobile

---

## Dynamic Content

### OTP Email
- [Name] → User's first name / full name
- [Code] → 6-digit random OTP
- Expiry → Always 10 minutes
- Message → Standard security notice

### Welcome Email
- [Name] → User's first name / full name
- [Amount] → Daily rate if provided (e.g., "$50/day", "$100/day")
- Calendly link → Always https://calendly.com/elcoderssoftwares12/30min
- Discount code → ELVERSE40 (40% off for 7 days)
- Website link → https://elcoders-devs.vercel.app/

---

## Links & CTA Tracking

All links are clickable and formatted for email clients:

### OTP Email Links
- None (security focused)

### Welcome Email Links
1. **Kickoff Call:** https://calendly.com/elcoderssoftwares12/30min
2. **Reschedule:** https://calendly.com/elcoderssoftwares12/30min
3. **Website:** https://elcoders-devs.vercel.app/
4. **WhatsApp:** https://wa.link/oktez7
5. **Twitter:** https://x.com/ElVerse27

---

## Branding Elements

### ELCODERS Logo
- Embedded as base64 data URI
- Displays at top of email
- Tech-themed (circuit/code elements)
- Blue & dark blue colors
- Approx 200px wide, responsive

### Company Name
- ELCODERS (7-letter, all caps, branded)
- Tagline: "Daily Velocity, Zero Fluff"
- Footer: "EL VERSE TECHNOLOGIES"

### Social/Contact
- WhatsApp link: https://wa.link/oktez7
- Twitter: https://x.com/ElVerse27
- Website: https://elcoders-devs.vercel.app/
- Email: elcoderssoftwares12@gmail.com

---

## Email Client Compatibility

Tested/Compatible with:
- ✅ Gmail (Web & App)
- ✅ Outlook (Web & Desktop)
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Mobile clients
- ✅ Dark mode support (most clients)

Fallback for unsupported clients:
- Plain text version provided
- Links still functional
- No broken images

---

## Deliverability Checklist

- ✅ From: elcoderssoftwares12@gmail.com
- ✅ To: [user email]
- ✅ Subject: Properly formatted
- ✅ HTML: Valid DOCTYPE and encoding
- ✅ Inline CSS: No external stylesheets
- ✅ Images: Base64 encoded (no external URLs)
- ✅ Links: Properly formatted HTTP/HTTPS
- ✅ Unsubscribe: Not required for transactional emails

---

## Testing Email Display

### What to check:
1. ✅ Logo displays correctly
2. ✅ Blue header shows properly
3. ✅ Text is readable
4. ✅ Links are clickable
5. ✅ Mobile view works
6. ✅ Lines wrap correctly
7. ✅ Spacing is balanced
8. ✅ Colors match specifications

### View in multiple clients:
- Gmail
- Outlook
- Apple Mail
- Mobile device (iOS/Android)

---

## Copy/Paste Template

If you need to manually send similar emails:

**OTP Email Subject:**
```
Verify Your Email - ELCODERS Signup
```

**Welcome Email Subject:**
```
Welcome to ELCODERS – Your Kickoff Call & Next Steps
```

**Key Information to Include:**
- Personalized greeting
- Clear steps/actions
- All links functional
- Discount code visible
- Professional signature
- Company information

---

## Notes

- Emails are sent within 5-15 seconds of request
- All emails are transactional (not marketing), so no unsubscribe needed
- OTP is valid for exactly 10 minutes
- Welcome email sends immediately after signup completion
- All links open in new tab/window
- Emails are mobile-optimized
- Dark mode support included

---

**These emails are professional, branded, and ready for production deployment! ✨**
