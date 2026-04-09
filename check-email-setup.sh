#!/bin/bash

# ELCODERS Email Configuration Checker
# This script verifies your email setup

echo ""
echo "=========================================="
echo "  ELCODERS Email Configuration Check"
echo "=========================================="
echo ""

# Check 1: .env.local exists
echo "1️⃣  Checking .env.local file..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists"
else
    echo "   ❌ .env.local NOT found"
    echo "   💡 Create .env.local with EMAIL_USER and EMAIL_PASSWORD"
fi
echo ""

# Check 2: EMAIL_USER set
echo "2️⃣  Checking EMAIL_USER variable..."
if [ -z "$EMAIL_USER" ]; then
    echo "   ❌ EMAIL_USER not set"
    echo "   💡 Add EMAIL_USER=elcoderssoftwares12@gmail.com to .env.local"
else
    echo "   ✅ EMAIL_USER = $EMAIL_USER"
fi
echo ""

# Check 3: EMAIL_PASSWORD set
echo "3️⃣  Checking EMAIL_PASSWORD variable..."
if [ -z "$EMAIL_PASSWORD" ]; then
    echo "   ❌ EMAIL_PASSWORD not set"
    echo "   💡 Add EMAIL_PASSWORD=your_16_char_password to .env.local"
else
    if [ ${#EMAIL_PASSWORD} -eq 16 ]; then
        echo "   ✅ EMAIL_PASSWORD is set (16 characters)"
    else
        echo "   ⚠️  EMAIL_PASSWORD is set but length is ${#EMAIL_PASSWORD} (should be 16)"
    fi
fi
echo ""

# Check 4: Node modules
echo "4️⃣  Checking nodemailer package..."
if [ -d "node_modules/nodemailer" ]; then
    echo "   ✅ nodemailer installed"
else
    echo "   ❌ nodemailer not installed"
    echo "   💡 Run: npm install"
fi
echo ""

# Check 5: Email config files
echo "5️⃣  Checking email files..."
files=("lib/mailer.ts" "lib/email-templates.ts" "lib/otp.ts" "app/api/auth/request-otp/route.ts")
missing=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file MISSING"
        ((missing++))
    fi
done
if [ $missing -eq 0 ]; then
    echo "   ✅ All email files present"
fi
echo ""

# Summary
echo "=========================================="
echo "  Summary"
echo "=========================================="
echo ""

if [ ! -z "$EMAIL_USER" ] && [ ! -z "$EMAIL_PASSWORD" ] && [ ${#EMAIL_PASSWORD} -eq 16 ]; then
    echo "✅ EMAIL CONFIGURATION READY"
    echo ""
    echo "Next steps:"
    echo "1. Restart dev server: npm run dev"
    echo "2. Test at: http://localhost:3000/auth"
    echo "3. Try sending an OTP"
else
    echo "❌ EMAIL CONFIGURATION INCOMPLETE"
    echo ""
    echo "To fix:"
    echo "1. Create or edit .env.local"
    echo "2. Add: EMAIL_USER=elcoderssoftwares12@gmail.com"
    echo "3. Add: EMAIL_PASSWORD=your_16_char_app_password"
    echo "4. Save and restart server"
fi
echo ""
