'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2, CheckCircle, Mail } from 'lucide-react';

const countryCodes = [
  { code: '+1', country: 'United States & Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+91', country: 'India' },
  { code: '+234', country: 'Nigeria' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+39', country: 'Italy' },
];

const industries = [
  'SaaS',
  'E-commerce',
  'FinTech',
  'Healthcare',
  'Education',
  'Real Estate',
  'Logistics',
  'Media & Entertainment',
  'Startup',
  'Other',
];

function ClientSignupContent() {
  const searchParams = useSearchParams();
  const isVerified = searchParams?.get('verified') || false;

  const [step, setStep] = useState(isVerified ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    // Step 0: Email
    fullName: '',
    email: isVerified || '',
    
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    companyName: '',
    
    // Step 2: Project Details
    countryCode: '+1',
    phone: '',
    industry: '',
    projectDescription: '',
    
    // Step 3: Budget & Timeline
    budget: '',
    timeline: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRequestOTP = async () => {
    setError('');
    
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Valid email is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP');
        setLoading(false);
        return;
      }

      setOtpSent(true);
      localStorage.setItem('elcoders_signup_type', 'client');
      
      // Redirect to OTP verification
      window.location.href = `/auth/verify-otp?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.fullName)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.industry) {
      setError('Please select an industry');
      return false;
    }
    if (!formData.projectDescription.trim()) {
      setError('Project description is required');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.budget) {
      setError('Please select a budget range');
      return false;
    }
    if (!formData.timeline) {
      setError('Please select a timeline');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!validateStep3()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/client-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          countryCode: formData.countryCode,
          phone: formData.phone,
          industry: formData.industry,
          projectDescription: formData.projectDescription,
          budget: formData.budget,
          timeline: formData.timeline,
          agreeToTerms: formData.agreeToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to sign up. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Aboard! 🎉</h2>
          <p className="text-blue-200 mb-2">Your signup is successful.</p>
          <p className="text-blue-300 mb-8">
            Our team will reach out within 24 hours to discuss your project and get started.
          </p>
          <a
            href="https://wa.link/d4oxqj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Chat with Team
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Client Registration</h1>
          <p className="text-slate-400">Step {step} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition ${
                s <= step ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Step 0: Email Verification */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Let's get started</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                <p className="text-xs text-slate-500 mt-2">We'll send a verification code to this email</p>
              </div>

              <button
                onClick={handleRequestOTP}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Verification Code
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Tell us about yourself</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Info */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Tell us about your project</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Country Code *
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">Select an industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget & Timeline */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Project Budget & Timeline</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $5K</option>
                  <option value="5k-15k">$5K - $15K</option>
                  <option value="15k-50k">$15K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="above-100k">$100K+</option>
                  <option value="custom">Custom (discuss with team)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">Select timeline</option>
                  <option value="urgent">ASAP (Urgent)</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-6">
                <p className="text-sm text-blue-200">
                  ✨ <strong>Special Offer:</strong> First 7 days at 40% off!
                </p>
                <p className="text-xs text-blue-300 mt-2">
                  Start with $49/day or custom pricing based on your needs.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
                <label className="text-sm text-slate-300">
                  I agree to ELCODERS' terms and conditions and privacy policy *
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {step === 3 ? 'Complete Signup' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}

function ClientSignupFallback() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-300">Loading...</p>
      </div>
    </main>
  );
}

export default function ClientSignup() {
  return (
    <Suspense fallback={<ClientSignupFallback />}>
      <ClientSignupContent />
    </Suspense>
  );
}
