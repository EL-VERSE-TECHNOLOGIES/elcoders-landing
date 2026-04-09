# 🚨 FIX: OTP & Email Not Sending - QUICK START

## The Problem
```
Email system NOT configured
❌ EMAIL_PASSWORD is missing
❌ No emails being sent
```

---

## The Solution (5 Minutes)

### **1️⃣ Enable Gmail 2FA**
- Go: https://myaccount.google.com/security
- Find: "2-Step Verification"
- Click: "Get Started"
- Complete: Phone verification

### **2️⃣ Get Gmail App Password**
- Go: https://myaccount.google.com/apppasswords
- Select: **Mail** + **Windows Computer** (or your device)
- Click: **Generate**
- Copy: 16-character password (e.g., `abcd efgh ijkl mnop`)

### **3️⃣ Create `.env.local` File**
Create new file: `/workspaces/elcoders-landing/.env.local`

Paste this:
```
EMAIL_USER=elcoderssoftwares12@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your actual 16-char password (remove spaces if any)

### **4️⃣ Restart Dev Server**
```bash
# Kill current: Ctrl+C
npm run dev
```

### **5️⃣ Test It**
- Go to: http://localhost:3000/auth
- Click: Client or Developer
- Enter: Your test email
- Click: "Send Verification Code"
- Check: Your inbox for OTP email

---

## ✅ Expected Result
```
✅ Email arrives in 5-15 seconds
✅ OTP code displays in email
✅ Welcome email sends after signup
✅ All links work
```

---

## For Production (Vercel)

1. Go: https://vercel.com/dashboard
2. Select: elcoders-landing-page project
3. Click: Settings → Environment Variables
4. Add:
   - `EMAIL_USER` = `elcoderssoftwares12@gmail.com`
   - `EMAIL_PASSWORD` = `your_16_char_password`
5. Save & Redeploy

---

## ⚠️ If It STILL Doesn't Work

**Check:**
- [ ] 2FA actually enabled (not just started)
- [ ] Using app password (not regular Gmail password)
- [ ] Dev server restarted after `.env.local` created
- [ ] `.env.local` in project root (not in subdirectory)
- [ ] Email address spelled correctly
- [ ] Check spam folder for test emails

**Debug:**
```bash
npm run dev
# Look for console messages:
# "Email sent: <id>" = SUCCESS
# "Failed to send email:" = ERROR (check details)
```

---

## 📋 Checklist
- [ ] 2FA enabled on Gmail
- [ ] App password generated (16 chars)
- [ ] `.env.local` file created in project root
- [ ] EMAIL_USER set correctly
- [ ] EMAIL_PASSWORD set correctly
- [ ] Dev server restarted
- [ ] Test email received in inbox

---

**Once complete:** Emails send automatically, OTP works, signup succeeds! 🚀
