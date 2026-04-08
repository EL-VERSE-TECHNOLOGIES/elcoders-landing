# ELCODERS Landing Page - Deployment Guide

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables configured
- [ ] HTTPS enabled on your domain
- [ ] Korapay test mode complete
- [ ] Email verified in Korapay
- [ ] Webhook URL updated (if needed)
- [ ] Performance tested (Lighthouse > 90)
- [ ] Mobile responsiveness verified
- [ ] Payment flow tested end-to-end

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

**Why Vercel?**
- Built for Next.js
- Zero-config deployment
- Automatic scaling
- Edge Functions for APIs
- Free tier available

#### Steps:

1. **Push Code to GitHub**
   ```bash
   # If not already done
   git init
   git add .
   git commit -m "Initial commit: ELCODERS landing page with Korapay integration"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME
   git push -u origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add these variables:

   ```
   NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_kM7m7BBtdH1Af514QMna1xHxLM8v1vutv72sWpNk
   KORAPAY_SECRET_KEY=sk_live_e9tiXn1oqUAPpT23YRF3BJPewmGKksuhkdEDPigu
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is now live!

5. **Custom Domain (Optional)**
   - Go to project settings → "Domains"
   - Add your custom domain
   - Follow DNS configuration
   - Wait for SSL certificate

#### Post-Deployment
1. Update Korapay webhook URL:
   - Korapay Dashboard → Webhooks
   - Set: `https://your-domain.com/api/korapay/webhook`

2. Test payment flow:
   - Complete a test purchase
   - Verify success page
   - Check webhook logs

### Option 2: Deploy to AWS Amplify

#### Steps:

1. **Connect GitHub to Amplify**
   - Visit AWS Amplify console
   - Click "New App" → "Host Web App"
   - Select GitHub provider
   - Select your repository
   - Click "Next"

2. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

3. **Add Environment Variables**
   - In Amplify console → "Environment Variables"
   - Add Korapay keys and app URL

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for build
   - Share your URL

### Option 3: Deploy to Railway

#### Steps:

1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository

2. **Configure**
   - Set "Build Command": `npm run build`
   - Set "Start Command": `npm run start`
   - Add environment variables

3. **Deploy**
   - Click "Deploy"
   - Wait for completion
   - Get your Railway URL

### Option 4: Deploy to Netlify

#### Steps:

1. **Connect GitHub**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository

2. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `.next`

3. **Environment Variables**
   - Click "Site settings" → "Environment"
   - Add Korapay keys

4. **Deploy**
   - Click "Deploy site"
   - Configure custom domain

## Environment Variables for Production

### Required Variables

```env
# Korapay Payment Gateway
NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_xxxxx
KORAPAY_SECRET_KEY=sk_live_xxxxx

# Application URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional Variables

```env
# Email Service (for notifications)
EMAIL_FROM=noreply@your-domain.com
SUPPORT_EMAIL=support@your-domain.com
EMAIL_SERVICE_KEY=your-email-service-key

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Feature Flags
ENABLE_NOTIFICATIONS=true
ENABLE_ANALYTICS=true
```

## Domain Configuration

### DNS Setup

1. **Vercel (if using Vercel domains)**
   - Automatic, no setup needed
   - Just add domain in Vercel settings

2. **Custom Domain with Vercel**
   - Add domain in project settings
   - Update DNS records:
     ```
     Type: CNAME
     Name: @ or www
     Value: cname.vercel-dns.com
     ```

3. **Custom Domain with Other Hosting**
   - Update DNS A records:
     ```
     Type: A
     Name: @
     Value: <Your hosting provider's IP>
     ```

4. **SSL Certificate**
   - Most providers auto-generate (Vercel, Netlify, Amplify)
   - Verify HTTPS works
   - Update `NEXT_PUBLIC_APP_URL` to https://

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze  # if configured

# Check for large dependencies
npm list --depth=0
```

### Image Optimization

Update `next.config.js` if needed:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

export default nextConfig;
```

### Content Delivery

Enable Edge Caching:
```tsx
// In route handlers
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-static'; // For static pages
```

## SSL/TLS Certificate

### Automatic (Recommended)
- Vercel: Automatic with any domain
- Netlify: Automatic with custom domain
- AWS Amplify: Automatic with custom domain
- Railway: Automatic

### Manual
If using custom setup:
1. Use Let's Encrypt (free)
2. Use your domain provider's SSL
3. Install certificate on server
4. Update `NEXT_PUBLIC_APP_URL` to https://

## Monitoring & Logs

### Vercel Monitoring

1. **Logs**
   - Function logs: Project settings → "Functions"
   - Deployment logs: Deployments tab

2. **Metrics**
   - Analytics tab
   - Core Web Vitals
   - Performance metrics

3. **Error Tracking**
   - Vercel Analytics
   - Sentry integration (optional)

### Application Monitoring

Add error tracking:
```tsx
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

## Backup & Recovery

### Database Backups

If adding database:
1. Set automatic backups
2. Test restore process
3. Keep backups secure

### Code Backups

1. Keep GitHub as source of truth
2. Tag releases: `git tag v1.0.0`
3. Backup environment variables securely

## Security Hardening

### Headers Configuration

Add security headers in `next.config.js`:
```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ];
}
```

### Rate Limiting

Add rate limiting to API routes:
```tsx
// lib/rate-limit.ts
const rateLimit = new Map();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recent = userRequests.filter(t => now - t < 60000);
  
  if (recent.length > 100) return false; // 100 requests per minute
  
  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}
```

### Input Validation

Already implemented in:
- `lib/korapay.ts` - Email and amount validation
- API routes - Payload validation

## Rollback Procedures

### Vercel Rollback
1. Go to "Deployments" tab
2. Click on previous deployment
3. Click "Redeploy"
4. Done!

### GitHub Rollback
```bash
# If you need to revert code
git log # Find commit hash
git revert <commit-hash>
git push origin main
```

## Post-Deployment Checklist

- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Pricing displays properly
- [ ] Payment flow completes
- [ ] Success page shows
- [ ] Mobile responsive
- [ ] Desktop responsive
- [ ] Performance good (Lighthouse > 90)
- [ ] No console errors
- [ ] Korapay webhook working
- [ ] Email validation works
- [ ] Form inputs working
- [ ] API routes responding
- [ ] Database queries working (if applicable)
- [ ] Error pages configured

## Troubleshooting Deployment

### Build Fails

```bash
# Check for errors
npm run build

# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

### Environment Variables Not Working

1. Verify in deployment platform settings
2. Redeploy after adding variables
3. Check variable names exactly match
4. Ensure they start with correct prefix:
   - `NEXT_PUBLIC_*` for client-side
   - No prefix for server-side

### Payment Not Working After Deploy

1. Check `NEXT_PUBLIC_APP_URL` matches domain
2. Update Korapay webhook URL
3. Verify Korapay API keys are correct
4. Check error logs in deployment console

### Slow Performance

1. Enable caching in Vercel settings
2. Optimize images
3. Check for large dependencies
4. Use Edge Functions for APIs

## Cost Estimation

### Vercel (Free plan sufficient for landing page)
- **Free**: Included usage
- **Pro**: $20/month if you exceed free tier

### Netlify
- **Free**: Perfect for landing pages
- **Pro**: $19/month for more features

### AWS Amplify
- **Always free** first 1000 build minutes
- Minimal costs for static sites

### Railway
- **$5/month minimum** for always-on app
- Or **pay as you go**

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Korapay Docs**: https://docs.korapay.com
- **Deployment Help**: Contact deployment platform support

---

**Your ELCODERS landing page is ready for production! 🚀**

Choose your deployment platform and follow the steps above.
