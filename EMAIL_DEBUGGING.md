# 🛠️ EMAIL DEBUGGING & ERROR MESSAGES

## What's Currently Happening

When you try to send OTP without environment variables set:

### **Error in Browser:**
```
{
  "error": "Failed to send OTP. Please try again."
}
```

### **Error in Server Console:**
```
Request OTP error: Error: missing credentials for "PLAIN" authentication
```

or

```
Failed to send email: Error: Invalid login: 535-5.7.8 Username and password not accepted
```

These errors mean: **EMAIL_PASSWORD is not set (or incorrect)**

---

## 🔍 How to Debug

### **Option 1: Check Environment Variables**

Open terminal and run:
```bash
echo "EMAIL_USER: $EMAIL_USER"
echo "EMAIL_PASSWORD: $EMAIL_PASSWORD"
```

**Expected output:**
```
EMAIL_USER: elcoderssoftwares12@gmail.com
EMAIL_PASSWORD: abcdefghijklmnop
```

**If you see (blank):**
```
EMAIL_USER: 
EMAIL_PASSWORD: 
```

→ Variables not set. Follow EMAIL_QUICK_FIX.md

### **Option 2: Check Dev Server Logs**

When you restart `npm run dev`, look for:

**Good sign:**
```
> npm run dev
Server ready on http://localhost:3000
```

**What to watch for when testing OTP:**

If email fails:
```
Failed to send email: Error: missing credentials for "PLAIN" authentication
```

→ EMAIL_PASSWORD not set

If email succeeds:
```
Email sent: <some-random-id>
```

→ ✅ Working!

### **Option 3: Check `.env.local` File**

```bash
# From project root:
cat .env.local

# Should output:
EMAIL_USER=elcoderssoftwares12@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

If file doesn't exist:
```
cat: .env.local: No such file or directory
```

→ Create the file (see EMAIL_QUICK_FIX.md)

---

## 📋 Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `missing credentials for "PLAIN" authentication` | EMAIL_PASSWORD not set | Add to `.env.local` |
| `Username and password not accepted` | Wrong/invalid password | Use Gmail app password (16 chars) |
| `Failed to send OTP. Please try again.` | General email failure | Check credentials + 2FA |
| `Invalid login` | Not authenticated | Verify Gmail 2FA + app password |
| `Timeout` | Network/Gmail issue | Try again, check internet |
| `Email sent: <id>` | ✅ SUCCESS | Working perfectly! |

---

## 🧪 Step-by-Step Test

### **1. Verify Setup**
```bash
# Check variables
echo "EMAIL_PASSWORD: $EMAIL_PASSWORD"

# If blank, create .env.local and restart server
```

### **2. Start Dev Server**
```bash
npm run dev
```

Watch for startup message. Should NOT show email errors at startup.

### **3. Test OTP Sending**

Open browser: http://localhost:3000/auth

Click "Client" or "Developer"

Fill in:
- Full Name: `Test User`
- Email: `your-real-email@gmail.com`

Click "Send Verification Code"

**Watch terminal for:**

Success:
```
Email sent: 1234567890abcdef@mail.gmail.com
```

Failure:
```
Failed to send email: Error: missing credentials...
```

### **4. Check Your Email**

Look in inbox:
- **Subject:** "Verify Your Email - ELCODERS Signup"
- **From:** elcoderssoftwares12@gmail.com
- **Content:** 6-digit OTP code

**Should arrive within 5-15 seconds**

---

## 🔒 Security Checks

### ✅ Is `.env.local` secure?

Yes, because:
- `.env.local` is in `.gitignore`
- Not committed to GitHub
- Only loaded locally
- Each dev has their own copy

### ✅ Is Gmail app password secure?

Yes, because:
- Different from your Gmail password
- Can be revoked anytime
- Specific permission (Mail only)
- 2FA required

---

## 🚀 Verification Commands

Run these to verify your setup:

```bash
# 1. Check if .env.local exists
test -f .env.local && echo "✅ .env.local exists" || echo "❌ .env.local missing"

# 2. Check if variables are loaded
grep -E "EMAIL_USER|EMAIL_PASSWORD" .env.local || echo "❌ Not found in .env.local"

# 3. Check nodemailer installation
npm list nodemailer | head -2

# 4. Check email files exist
test -f lib/mailer.ts && echo "✅ lib/mailer.ts" || echo "❌ Missing"
test -f lib/email-templates.ts && echo "✅ lib/email-templates.ts" || echo "❌ Missing"
test -f lib/otp.ts && echo "✅ lib/otp.ts" || echo "❌ Missing"
```

---

## 📊 Test Results Summary

After following setup:

| Component | Status | Notes |
|-----------|--------|-------|
| .env.local | ✅ | File exists with credentials |
| EMAIL_USER | ✅ | `elcoderssoftwares12@gmail.com` |
| EMAIL_PASSWORD | ✅ | 16-character app password |
| nodemailer | ✅ | Version 6.9.8 installed |
| Email templates | ✅ | All HTML templates present |
| OTP system | ✅ | Generates codes correctly |
| **Email Sending** | **✅** | **Works end-to-end** |

---

## 🎯 Next Actions

1. **If setup not done yet:**
   - Follow [EMAIL_QUICK_FIX.md](EMAIL_QUICK_FIX.md)
   - Should take ~10 minutes

2. **If setup done but still not working:**
   - Run debug commands above
   - Check error in console
   - Restart dev server
   - Test again

3. **If emails now working:**
   - Test full signup flow
   - Verify OTP email arrives
   - Verify welcome email arrives
   - Ready for production!

---

## 🆘 Still Having Issues?

Check this priority order:

1. **Did you restart server?** ← Yes, most common issue
2. **Is `.env.local` in project root?** ← Not in subdirectories
3. **Is app password 16 characters?** ← Check length
4. **Is 2FA actually enabled?** ← Verify status online
5. **Check spam folder?** ← Gmail might filter
6. **Try different test email?** ← Test with real Gmail

---

## 📞 Support

For each issue, check corresponding file:

- **Setup help:** [EMAIL_QUICK_FIX.md](EMAIL_QUICK_FIX.md)
- **Detailed guide:** [EMAIL_SETUP_REQUIRED.md](EMAIL_SETUP_REQUIRED.md)
- **Diagnosis:** [EMAIL_DIAGNOSIS.md](EMAIL_DIAGNOSIS.md)
- **Template example:** [.env.local.example](.env.local.example)

---

**Status: Currently Not Sending (Missing EMAIL_PASSWORD)**

**Solution: ~10 minutes to fix - Start with EMAIL_QUICK_FIX.md** ⏱️
