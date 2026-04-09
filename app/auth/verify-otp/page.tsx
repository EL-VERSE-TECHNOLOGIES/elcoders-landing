'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyOTP() {
  const router = useRouter();

  useEffect(() => {
    // OTP system has been disabled, redirect to auth
    router.push('/auth');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting...</p>
      </div>
    </div>
  );
}
