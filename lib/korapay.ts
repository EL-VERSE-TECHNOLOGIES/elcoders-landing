/**
 * Korapay Payment Integration Utilities
 * Helper functions for Korapay API interactions
 */

export interface KorapayInitializeRequest {
  email: string;
  amount: number; // Amount in NGN (not kobo)
  reference: string;
  metadata?: Record<string, any>;
}

export interface KorapayInitializeResponse {
  success: boolean;
  data?: {
    id: string;
    reference: string;
    customer: {
      email: string;
    };
    amount: number;
    status: string;
    checkout_url: string;
  };
  authorization_url?: string;
  error?: string;
}

export interface KorapayVerifyResponse {
  success: boolean;
  data?: {
    id: string;
    reference: string;
    customer: {
      email: string;
    };
    amount: number;
    currency: string;
    status: 'success' | 'failed' | 'pending';
    metadata: Record<string, any>;
    created_at: string;
  };
  status?: string;
  amount?: number;
  reference?: string;
  error?: string;
}

/**
 * Initialize a payment transaction with Korapay
 */
export async function initializePayment(
  payload: KorapayInitializeRequest
): Promise<KorapayInitializeResponse> {
  try {
    const response = await fetch('/api/korapay/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: KorapayInitializeResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to initialize payment:', error);
    return {
      success: false,
      error: 'Failed to initialize payment',
    };
  }
}

/**
 * Verify a payment transaction
 */
export async function verifyPayment(
  reference: string
): Promise<KorapayVerifyResponse> {
  try {
    const response = await fetch(`/api/korapay/verify?reference=${reference}`);
    const data: KorapayVerifyResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to verify payment:', error);
    return {
      success: false,
      error: 'Failed to verify payment',
    };
  }
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(prefix: string = 'elcoders'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format amount for display (from kobo to NGN)
 */
export function formatAmount(kobo: number): string {
  const naira = kobo / 100;
  return `₦${naira.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate payment amount
 */
export function isValidAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

/**
 * Handle Korapay payment redirect
 */
export async function handlePaymentRedirect(
  email: string,
  amount: number,
  planId: string,
  planName: string
): Promise<string | null> {
  // Validate inputs
  if (!isValidEmail(email)) {
    throw new Error('Invalid email address');
  }

  if (!isValidAmount(amount)) {
    throw new Error('Invalid amount');
  }

  // Initialize payment
  const reference = generatePaymentReference();
  const response = await initializePayment({
    email,
    amount,
    reference,
    metadata: {
      plan_id: planId,
      plan_name: planName,
    },
  });

  if (!response.success || !response.authorization_url) {
    throw new Error(response.error || 'Failed to initialize payment');
  }

  return response.authorization_url;
}

/**
 * Parse Korapay webhook payload
 */
export interface KorapayWebhookPayload {
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

export function parseWebhookPayload(body: string): KorapayWebhookPayload {
  return JSON.parse(body) as KorapayWebhookPayload;
}
