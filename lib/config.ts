/**
 * Configuration and Environment Validation
 */

// Korapay Configuration
export const korapayConfig = {
  publicKey: process.env.NEXT_PUBLIC_KORAPAY_PUBLIC_KEY,
  secretKey: process.env.KORAPAY_SECRET_KEY,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

// Validate required environment variables
export function validateEnvironment(): string[] {
  const errors: string[] = [];

  if (!korapayConfig.publicKey) {
    errors.push('NEXT_PUBLIC_KORAPAY_PUBLIC_KEY is not set');
  }

  if (!korapayConfig.secretKey) {
    errors.push('KORAPAY_SECRET_KEY is not set');
  }

  if (!process.env.NEXT_PUBLIC_APP_URL && process.env.NODE_ENV === 'production') {
    errors.push('NEXT_PUBLIC_APP_URL is required in production');
  }

  return errors;
}

// Log validation errors in development
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  const errors = validateEnvironment();
  if (errors.length > 0) {
    console.warn('⚠️  Environment Configuration Warnings:');
    errors.forEach(error => console.warn(`  - ${error}`));
  }
}

// Pricing configuration
export const pricingConfig = {
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: 50000, // in kobo (₦500)
      currency: 'NGN',
      description: 'Perfect for small projects',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 150000, // in kobo (₦1,500)
      currency: 'NGN',
      description: 'Ideal for growing businesses',
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 500000, // in kobo (₦5,000)
      currency: 'NGN',
      description: 'For large-scale projects',
    },
  ],
};

// Site configuration
export const siteConfig = {
  name: 'ELCODERS',
  description:
    'Transform your vision into reality with cutting-edge web development, UI/UX design, and AI solutions.',
  url: korapayConfig.appUrl,
  ogImage: `${korapayConfig.appUrl}/og-image.png`,
  links: {
    twitter: 'https://twitter.com/elcoders',
    github: 'https://github.com/elcoders',
    linkedin: 'https://linkedin.com/company/elcoders',
  },
};

// Email configuration (for notifications - add your email service)
export const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@elcoders.com',
  supportEmail: process.env.SUPPORT_EMAIL || 'support@elcoders.com',
};

// Feature flags
export const features = {
  enablePayments: !!korapayConfig.secretKey,
  enableWebhooks: !!korapayConfig.secretKey,
  enableNotifications: !!process.env.EMAIL_SERVICE_KEY,
};
