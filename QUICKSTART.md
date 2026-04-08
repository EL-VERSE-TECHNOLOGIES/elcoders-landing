# ELCODERS Landing Page - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Environment Variables Setup ✅ (Already Done)

Your Korapay environment variables have been configured:
- `NEXT_PUBLIC_KORAPAY_PUBLIC_KEY` - Public key for frontend
- `KORAPAY_SECRET_KEY` - Secret key for backend (secure)
- `NEXT_PUBLIC_APP_URL` - Your application URL

These are already set in your Vercel project settings.

### Step 2: Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Test the Landing Page

1. **View the Page**: Scroll through all sections
   - Navbar with navigation
   - Hero section with stats
   - Services/Features
   - Pricing plans
   - Development timeline
   - FAQ section
   - Footer

2. **Test Pricing & Payment**:
   - Scroll to "Pricing" section
   - Click on a plan (they have hover animations)
   - Enter your email
   - Click "Proceed to Payment"
   - You'll be redirected to Korapay

3. **Test Payment Success Page**:
   - After completing payment, you'll see the success page
   - Transaction details are displayed
   - Return link takes you back to home

## 📋 What's Included

### Frontend Components
- ✅ Responsive Navbar
- ✅ Hero Section with Animations
- ✅ Features Showcase
- ✅ Pricing Plans with Payment Integration
- ✅ Development Timeline
- ✅ FAQ Accordion
- ✅ Professional Footer

### Backend API
- ✅ `/api/korapay/initialize` - Start payment
- ✅ `/api/korapay/verify` - Check payment status
- ✅ `/api/korapay/webhook` - Handle notifications

### Utilities
- ✅ Korapay payment helpers
- ✅ Configuration management
- ✅ Email validation
- ✅ Amount formatting

## 🎨 Customization Guide

### Change Company Name
Edit `components/navbar.tsx` and `components/footer.tsx`:
```tsx
// Search for "ELCODERS" and replace with your company name
const companyName = "YOUR COMPANY NAME";
```

### Modify Pricing Plans
Edit `components/pricing.tsx`:
```tsx
const plans = [
  {
    id: 'starter',
    name: 'Your Plan Name',
    price: 50000,  // in kobo (NGN currency)
    description: 'Your description',
    features: ['Feature 1', 'Feature 2'],
  }
];
```

### Update Colors
Search for color classes in components:
- `from-blue-500 to-cyan-500` - Main gradient
- `bg-slate-950` - Dark background
- `text-cyan-400` - Accent text

Replace with your preferred Tailwind colors.

### Add New Sections
1. Create new component in `components/`
2. Import in `app/page.tsx`
3. Add to main page

Example:
```tsx
// components/testimonials.tsx
export function Testimonials() {
  return <section>Your content</section>;
}

// app/page.tsx
import { Testimonials } from '@/components/testimonials';

export default function Home() {
  return (
    <main>
      {/* existing sections */}
      <Testimonials />
    </main>
  );
}
```

### Update Navigation Links
Edit `components/navbar.tsx`:
```tsx
<a href="#your-section">Your Link</a>
```

### Change Timeline Phases
Edit `components/timeline.tsx`:
```tsx
const phases = [
  {
    phase: 'Phase X',
    title: 'Your Phase Title',
    duration: '1-2 weeks',
    description: 'Description',
    tasks: ['Task 1', 'Task 2'],
  }
];
```

### Update FAQ Questions
Edit `components/faq.tsx`:
```tsx
const faqs = [
  {
    question: 'Your question?',
    answer: 'Your detailed answer',
  }
];
```

## 🧪 Testing Payments

### Development Testing
1. Go to pricing section
2. Select a plan
3. Enter test email: `test@example.com`
4. Click "Proceed to Payment"
5. You'll see Korapay test interface

### Webhook Testing
To test webhook locally:
```bash
# Install ngrok for tunneling
npm install -g ngrok

# Start ngrok
ngrok http 3000

# Use ngrok URL in Korapay webhook settings
# http://your-ngrok-url.ngrok.io/api/korapay/webhook
```

## 📱 Responsive Design

The landing page is fully responsive:
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grids
- **Desktop**: 3-4 column grids

Test by:
1. Opening DevTools (F12)
2. Toggling device toolbar
3. Testing at different breakpoints

## 🔐 Security Checklist

Before deploying:
- ✅ Environment variables configured
- ✅ HTTPS enabled
- ✅ Webhook signature validation active
- ✅ Input validation enabled
- ✅ No sensitive keys in code

## 📊 Performance Tips

1. **Optimize Images**: Use Next.js Image component
2. **Code Splitting**: Components auto-split by Next.js
3. **Lazy Loading**: Sections load as users scroll
4. **CSS**: Tailwind optimizes unused classes

Check performance:
```bash
npm run build
npm run start
# Then test with Lighthouse in DevTools
```

## 🚢 Deployment to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: ELCODERS landing page"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Click "Import"

3. **Configure Environment Variables**:
   - Go to Project Settings
   - Click "Environment Variables"
   - Add your Korapay keys
   - Add `NEXT_PUBLIC_APP_URL`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Share your live URL!

## 🐛 Troubleshooting

### Payment Not Working
1. Check environment variables are set
2. Verify Korapay keys are correct
3. Check browser console for errors
4. Verify app URL matches Korapay settings

### Styling Issues
1. Clear `.next` folder: `rm -rf .next`
2. Rebuild: `npm run dev`
3. Clear browser cache: Ctrl+Shift+Delete

### Deployment Issues
1. Check build logs in Vercel dashboard
2. Verify all environment variables
3. Check TypeScript errors: `npm run build`

## 📚 Additional Resources

- **Korapay Docs**: https://docs.korapay.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Documentation**: https://react.dev

## 📞 Support

For detailed documentation, see:
- `README.md` - Full documentation
- `BUILD_SUMMARY.md` - What was built
- `QUICKSTART.md` - This file

## ✨ Next Steps

1. **Customize**: Update company name, colors, content
2. **Test**: Try the pricing and payment flow
3. **Deploy**: Push to GitHub and deploy to Vercel
4. **Enhance**: Add email notifications, admin dashboard, etc.

---

**Congratulations! Your ELCODERS landing page is ready to go! 🎉**

For customization help, check the documentation files above.
