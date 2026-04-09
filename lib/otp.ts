/**
 * OTP (One-Time Password) Management
 * Stores OTPs in memory with expiration
 */

interface StoredOTP {
  code: string;
  email: string;
  createdAt: number;
  attempts: number;
  verified: boolean;
}

// In-memory OTP storage
// For production, use Redis or database
const otpStorage = new Map<string, StoredOTP>();

// OTP configuration
const OTP_LENGTH = 6;
const OTP_VALIDITY_MINUTES = 10;
const MAX_ATTEMPTS = 5;

/**
 * Generate a random OTP code
 */
function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create and store a new OTP
 */
export function createOTP(email: string): string {
  const code = generateOTPCode();
  const key = email.toLowerCase();

  otpStorage.set(key, {
    code,
    email: key,
    createdAt: Date.now(),
    attempts: 0,
    verified: false,
  });

  return code;
}

/**
 * Verify an OTP code
 */
export function verifyOTP(email: string, code: string): { valid: boolean; error?: string } {
  const key = email.toLowerCase();
  const otp = otpStorage.get(key);

  if (!otp) {
    return { valid: false, error: 'OTP not found. Please request a new one.' };
  }

  // Check if OTP has expired
  const expiryTime = otp.createdAt + OTP_VALIDITY_MINUTES * 60 * 1000;
  if (Date.now() > expiryTime) {
    otpStorage.delete(key);
    return { valid: false, error: 'OTP has expired. Please request a new one.' };
  }

  // Check max attempts
  if (otp.attempts >= MAX_ATTEMPTS) {
    otpStorage.delete(key);
    return { valid: false, error: 'Too many wrong attempts. Please request a new OTP.' };
  }

  // Check if code matches
  if (otp.code !== code) {
    otp.attempts += 1;
    return { valid: false, error: `Invalid OTP. Attempts remaining: ${MAX_ATTEMPTS - otp.attempts}` };
  }

  // Mark as verified
  otp.verified = true;
  return { valid: true };
}

/**
 * Check if an email has a verified OTP
 */
export function isOTPVerified(email: string): boolean {
  const key = email.toLowerCase();
  const otp = otpStorage.get(key);
  return otp ? otp.verified : false;
}

/**
 * Clear OTP for an email
 */
export function clearOTP(email: string): void {
  const key = email.toLowerCase();
  otpStorage.delete(key);
}

/**
 * Get OTP info (for debugging only - remove in production)
 */
export function getOTPInfo(email: string) {
  const key = email.toLowerCase();
  const otp = otpStorage.get(key);
  if (!otp) return null;

  return {
    email: otp.email,
    attempts: otp.attempts,
    verified: otp.verified,
    expiresIn: Math.ceil((otp.createdAt + OTP_VALIDITY_MINUTES * 60 * 1000 - Date.now()) / 1000),
  };
}

/**
 * Cleanup expired OTPs (run periodically)
 */
export function cleanupExpiredOTPs(): number {
  let count = 0;
  const now = Date.now();
  const expiryThreshold = OTP_VALIDITY_MINUTES * 60 * 1000;

  for (const [key, otp] of otpStorage.entries()) {
    if (now - otp.createdAt > expiryThreshold) {
      otpStorage.delete(key);
      count++;
    }
  }

  return count;
}
