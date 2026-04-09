# 🔧 EMAIL CONFIGURATION - SETUP REQUIRED

## ⚠️ CURRENT STATUS: EMAIL NOT CONFIGURED

**Environment Variables:** NOT SET  
**OTP Emails:** NOT SENDING  
**Welcome Emails:** NOT SENDING  

---

## 🚨 Problem

The `EMAIL_PASSWORD` environment variable is not configured. Without this, the email system cannot authenticate with Gmail and send emails.

**Current Status:**
- ✅ Email code is correct
- ✅ Email templates are ready
- ✅ OTP system works
- ❌ **EMAIL_PASSWORD missing** ← This is the blocker

---

## ✅ Solution: 5-Step Setup

### **STEP 1: Enable 2FA on Gmail Account**

1. Go to: https://myaccount.google.com/
2. Click **"Security"** (left sidebar)
3. Scroll to **"2-Step Verification"**
4. Click **"Get Started"**
5. Follow the prompts to enable 2FA
6. Verify with your phone

### **STEP 2: Generate Gmail App Password**

1. Go to: https://myaccount.google.com/apppasswords
2. You should see **"App passwords"** only if 2FA is enabled
3. Select:
   - **App:** Mail
   - **Device:** Windows/Mac/Linux
4. Google will generate a **16-character password**
5. **Copy this password** (you'll need it in Step 4)

**Example:** `abcd efgh ijkl mnop` (with spaces - remove them)

### **STEP 3: Create Local `.env.local` File (For Development)**

Create a new file: `/workspaces/elcoders-landing/.env.local`

Add this content:
```env
EMAIL_USER=elcoderssoftwares12@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your actual 16-character app password (remove spaces).

**File location:**
```
/workspaces/elcoders-landing/
├── .env.local              ← Create this file
├── .env
├── .gitignore
├── package.json
└── ...
```

### **STEP 4: Set in Vercel (For Production)**

1. Go to: https://vercel.com/dashboard
2. Select your project **"elcoders-landing-page"**
3. Click **"Settings"** (top nav)
4. Go to **"Environment Variables"** (left sidebar)
5. Add two variables:

| Name | Value |
|------|-------|
| `EMAIL_USER` | `elcoderssoftwares12@gmail.com` |
| `EMAIL_PASSWORD` | `abcdefghijklmnop` |

6. Click **"Save"**
7. Redeploy your project

### **STEP 5: Test It**

After setting environment variables:

```bash
# For development
npm run dev
# Then test signup at: http://localhost:3000/auth
```

**Test the OTP flow:**
1. Go to http://localhost:3000/auth
2. Click "Client" or "Developer"
3. Enter your email
4. Click "Send Verification Code"
5. Check your email inbox for OTP

---

## 🔍 Troubleshooting

### "Environment variables not working locally"

**Solution:** Restart dev server after creating `.env.local`

```bash
# Kill current process (Ctrl+C)
# Then restart:
npm run dev
```

### "Still not receiving emails after setting variables"

**Check these:**
1. ✅ 2FA is enabled on Gmail
2. ✅ App password is correct (16 characters, no spaces)
3. ✅ `.env.local` file exists in project root
4. ✅ Dev server restarted after creating `.env.local`
5. ✅ Check spam/junk folder in Gmail
6. ✅ Verify email address is correct (no typos)

### "Gmail says 'Less secure apps' blocked the sign-in"

**This is normal!** You should NOT see this error if:
- You used Gmail App Password (not regular password) ✅
- 2FA is enabled ✅

If you see this error, you may have:
- Used the wrong password type
- Not enabled 2FA

**Solution:** Follow Steps 1-2 again carefully.

### "I can't find App Passwords option"

**Possible reasons:**
1. 2FA not enabled yet (do Step 1)
2. Using a work/school Google account (not supported)
3. Browser cached old Gmail page (try incognito)

**Solution:** Go to https://myaccount.google.com/apppasswords in a fresh tab

---

## 📋 Verification Checklist

Before testing, verify:

- [ ] Gmail account 2FA is **enabled**
- [ ] Gmail App Password is **generated** (16 characters)
- [ ] `.env.local` file **exists** in project root
- [ ] `EMAIL_USER` set to `elcoderssoftwares12@gmail.com`
- [ ] `EMAIL_PASSWORD` set to your 16-char app password
- [ ] Dev server **restarted** after `.env.local` creation
- [ ] No typos in environment variables
- [ ] `.env.local` is in **`.gitignore`** (for security)

---

## 🔒 Security Notes

**IMPORTANT:** Never commit `.env.local` to Git

Add to `.gitignore` (should already be there):
```
.env.local
.env.*.local
```

**Verify `.gitignore` contains:**
```
.env
.env.local
.env.*.local
```

---

## 📧 After Setup: What Happens

Once configured, the email flow is:

### **OTP Email Flow:**
```
User clicks "Send Code"
  ↓
Backend generates 6-digit OTP
  ↓
sendOTPEmail() called
  ↓
Gmail SMTP authenticates with EMAIL_PASSWORD
  ↓
Email sent to user inbox
  ↓
User receives: "Verify Your Email - ELCODERS Signup"
```

### **Welcome Email Flow:**
```
User completes signup
  ↓
OTP verified
  ↓
sendWelcomeEmail() called
  ↓
Gmail SMTP authenticates
  ↓
Welcome email sent
  ↓
User receives: "Welcome to ELCODERS – Your Kickoff Call & Next Steps"
  ↓
Email includes:
  - Kickoff call link (Calendly)
  - ELVERSE40 code (40% off)
  - Daily rate confirmation
  - Contact info
```

---

## 🧪 Testing Without Vercel

Test locally with:

```bash
# 1. Create .env.local with variables
# 2. Restart dev server
npm run dev

# 3. Test signup
# http://localhost:3000/auth

# 4. Check console for:
# "Email sent: <messageId>"
# or
# "Failed to send email: <error>"
```

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| Email Service | Gmail SMTP |
| App Email | elcoderssoftwares12@gmail.com |
| Requires | 2FA Enabled + App Password |
| Password Length | 16 characters (no spaces) |
| OTP Valid | 15 minutes |
| Welcome Email | Immediate after signup |
| Config File | `.env.local` (local) or Vercel Settings (production) |

---

## ✅ After Setup Confirmation

Once you set up environment variables:

1. **Restart your dev server**
2. **Test OTP signup** at `/auth`
3. **Check inbox** for verification email
4. **Verify it works** before deploying to Vercel
5. **Deploy to Vercel** with environment variables set

**Status becomes:** 🟢 **EMAILS SENDING**

---

## 🎯 Next Steps

1. ✅ Enable 2FA on Gmail
2. ✅ Generate App Password
3. ✅ Create `.env.local` file
4. ✅ Restart dev server
5. ✅ Test email sending
6. ✅ Set Vercel environment variables
7. ✅ Redeploy to Vercel

**Once complete, OTP and confirmation emails will send automatically! 🚀**
