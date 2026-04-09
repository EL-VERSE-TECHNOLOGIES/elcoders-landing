'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, Check } from 'lucide-react';

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

const techStacks = {
  'Frontend': [
    'React',
    'Vue.js',
    'Angular',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'SASS/SCSS',
    'HTML/CSS',
  ],
  'Backend': [
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust',
    'C#/.NET',
    'PHP',
    'Ruby on Rails',
  ],
  'Database': [
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Firebase',
    'Redis',
    'DynamoDB',
    'Elasticsearch',
    'GraphQL',
  ],
  'Mobile': [
    'React Native',
    'Flutter',
    'Swift',
    'Kotlin',
    'iOS',
    'Android',
    'Expo',
    'Cordova',
  ],
  'Cloud & DevOps': [
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'GitHub Actions',
    'Vercel',
  ],
  'AI/ML': [
    'Python',
    'TensorFlow',
    'PyTorch',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'LLMs (ChatGPT, Claude)',
  ],
  'Other': [
    'Cybersecurity',
    'Blockchain',
    'Web3',
    'GraphQL',
    'Microservices',
    'API Development',
    'Testing',
    'DevOps',
  ],
};

const experience = [
  { value: 'junior', label: 'Junior (0-2 years)' },
  { value: 'mid', label: 'Mid-level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-10 years)' },
  { value: 'lead', label: 'Lead/Architect (10+ years)' },
];

export default function DeveloperSignup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    
    // Step 2
    countryCode: '+1',
    phone: '',
    experienceLevel: '',
    availability: '',
    
    // Step 3
    selectedTechStacks: [] as string[],
    
    // Step 4
    portfolio: '',
    bio: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const toggleTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTechStacks: prev.selectedTechStacks.includes(tech)
        ? prev.selectedTechStacks.filter(t => t !== tech)
        : [...prev.selectedTechStacks, tech],
    }));
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
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.experienceLevel) {
      setError('Please select your experience level');
      return false;
    }
    if (!formData.availability) {
      setError('Please select your availability');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.selectedTechStacks.length === 0) {
      setError('Please select at least one technology');
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!formData.bio.trim()) {
      setError('Bio/profile summary is required');
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
    if (step === 3 && !validateStep3()) return;
    
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!validateStep4()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/developer-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Team! 🚀</h2>
          <p className="text-purple-200 mb-2">Your developer profile is complete.</p>
          <p className="text-purple-300 mb-8">
            Our technical team will review your profile and reach out within 48 hours with project opportunities.
          </p>
          <a
            href="https://wa.link/d4oxqj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition"
          >
            Chat with Team
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Developer Registration</h1>
          <p className="text-slate-400">Step {step} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition ${
                s <= step ? 'bg-purple-500' : 'bg-slate-700'
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

          {/* Step 1: Basic Info */}
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
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                    placeholder="Developer"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
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
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Experience & Availability */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Your Experience</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Country Code *
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Experience Level *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select your experience level</option>
                  {experience.map((exp) => (
                    <option key={exp.value} value={exp.value}>
                      {exp.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select your availability</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract/Project Based</option>
                  <option value="flexible">Flexible/As Needed</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Tech Stack */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-2">Your Tech Stack</h2>
              <p className="text-slate-400 mb-6">Select all technologies you're proficient with *</p>
              
              <div className="space-y-6">
                {Object.entries(techStacks).map(([category, techs]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {techs.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => toggleTechStack(tech)}
                          className={`p-3 rounded-lg border-2 transition flex items-center justify-between ${
                            formData.selectedTechStacks.includes(tech)
                              ? 'bg-purple-500/20 border-purple-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-sm font-medium">{tech}</span>
                          {formData.selectedTechStacks.includes(tech) && (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-purple-200">
                  Selected: <span className="font-semibold">{formData.selectedTechStacks.length}</span> technologies
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Portfolio & Bio */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Portfolio & Profile</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <p className="text-xs text-slate-500 mt-1">GitHub, personal site, or portfolio link</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio / Professional Summary *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your expertise, and what makes you a great developer..."
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 my-6">
                <p className="text-sm text-purple-200">
                  ✨ <strong>Premium Opportunity:</strong> Join our elite developer network and get high-impact projects.
                </p>
                <p className="text-xs text-purple-300 mt-2">
                  Competitive rates, flexible arrangements, and continuous learning opportunities.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500 focus:ring-purple-500"
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
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {step === 4 ? 'Complete Signup' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
