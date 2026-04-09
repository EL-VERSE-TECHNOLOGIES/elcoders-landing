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
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Step 0: Basic Info
    fullName: '',
    email: '',
    
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

  const validateStep0 = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }
    return true;
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
    
    if (step === 0 && !validateStep0()) return;
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
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 text-center">
              <div className="mb-4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="ELCODERS" className="max-w-48 mx-auto mb-4 opacity-0"/>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome to ELCODERS</h1>
              <p className="text-cyan-100 text-lg">You're in. Let's ship code.</p>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <p className="text-lg mb-6">Hi <strong>{formData.firstName}</strong>,</p>
              
              <p className="text-lg font-medium text-cyan-600 mb-6">You're in. Welcome to ELCODERS.</p>
              
              <p className="text-gray-700 mb-6 text-lg">Here's what happens next:</p>
              
              {/* Step 1 */}
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-6 rounded-r-lg">
                <div className="font-semibold text-cyan-800 text-lg mb-2">📅 STEP 1: Your Kickoff Call</div>
                <p className="text-gray-700 mb-3">
                  <a href="https://calendly.com/elcoderssoftwares12/30min" className="text-cyan-600 font-medium underline">https://calendly.com/elcoderssoftwares12/30min</a>
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-6 rounded-r-lg">
                <div className="font-semibold text-cyan-800 text-lg mb-2">⏱️ STEP 2: Before the Call (5 min prep)</div>
                <ul className="text-gray-700 ml-4">
                  <li>Have your GitHub/Lab repo URL ready</li>
                  <li>Know the ONE bug or task you want fixed first</li>
                  <li>That's it. No SOW. No paperwork.</li>
                </ul>
              </div>
              
              {/* Step 3 */}
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-6 rounded-r-lg">
                <div className="font-semibold text-cyan-800 text-lg mb-2">🎁 STEP 3: Your Discount</div>
                <p className="text-gray-700 mb-2">Code <strong>ELVERSE40</strong> is active. First 7 days at 40% off.</p>
                <p className="text-gray-700">Your card will be charged starting tomorrow.</p>
              </div>
              
              {/* Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="font-medium mb-3">📞 Need to reschedule?</p>
                <p className="mb-2">
                  <a href="https://calendly.com/elcoderssoftwares12/30min" className="text-cyan-600 underline">https://calendly.com/elcoderssoftwares12/30min</a>
                </p>
                <p className="mb-6">
                  <a href="https://elcoders-devs.vercel.app/" className="text-cyan-600 underline">https://elcoders-devs.vercel.app/</a>
                </p>
              </div>
              
              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">Talk soon,</p>
                <p className="mt-4">
                  <strong className="text-lg">Cebastian Jerry</strong><br/>
                  <span className="text-gray-500">Sales, ELCODERS</span><br/>
                  <span className="text-gray-500">EL VERSE TECHNOLOGIES</span>
                </p>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <div className="flex justify-center space-x-6">
                  <a href="https://wa.link/d4oxqj" className="text-cyan-600 hover:text-cyan-800 font-medium">WhatsApp</a>
                  <a href="https://x.com/ElVerse27" className="text-cyan-600 hover:text-cyan-800 font-medium">Twitter</a>
                  <a href="https://elcoders-devs.vercel.app/" className="text-cyan-600 hover:text-cyan-800 font-medium">Website</a>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
              <p className="text-2xl font-bold text-cyan-600 mb-2">ELCODERS</p>
              <p className="text-gray-500 text-sm">Daily Velocity. Zero Fluff.</p>
              <p className="text-gray-400 text-xs mt-4">&copy; 2026 EL VERSE TECHNOLOGIES. All rights reserved.</p>
            </div>
          </div>
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
          <p className="text-slate-400">Step {step + 1} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition ${
                s <= step + 1 ? 'bg-cyan-500' : 'bg-slate-700'
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

          {/* Step 0: Basic Info */}
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
              </div>

              <button
                onClick={handleNext}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Next
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
