'use client';

import { useState } from 'react';

export function Pricing() {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const plans = [
    {
      id: 'scout',
      name: 'SCOUT',
      originalPrice: 69,
      salePrice: 49,
      badge: 'Quick Fixes & Bug Squashing',
      monthlyEquivalent: 980,
      features: [
        { text: '1 Hour Dedicated Dev Time Daily', included: true },
        { text: 'Direct Slack Channel Access', included: true },
        { text: 'Bug Fixes & Hotfixes (Same Day)', included: true },
        { text: 'Unlimited Repos', included: true },
        { text: 'Rollover Hours (Up to 7 Days)', included: true },
        { text: 'New Feature Development', included: false },
        { text: 'Architecture Planning', included: false },
      ],
      highlighted: false,
    },
    {
      id: 'squad',
      name: 'SQUAD',
      originalPrice: 129,
      salePrice: 89,
      badge: '⭐ MOST POPULAR',
      monthlyEquivalent: 1780,
      features: [
        { text: '3 Hours Dedicated Dev Time Daily', included: true },
        { text: 'New Feature Development', included: true },
        { text: 'Pull Request Reviews', included: true },
        { text: 'Slack + Linear/Jira Integration', included: true },
        { text: 'Code Refactoring & Cleanup', included: true },
        { text: 'Rollover Hours (Up to 14 Days)', included: true },
        { text: '2 Team Members (Dev + QA)', included: true },
        { text: 'CTO-Level Strategy', included: false },
      ],
      highlighted: true,
    },
    {
      id: 'cto',
      name: 'CTO',
      originalPrice: 199,
      salePrice: 149,
      badge: 'Fractional Leadership',
      monthlyEquivalent: 2980,
      features: [
        { text: '5 Hours Dedicated Dev Time Daily', included: true },
        { text: 'Architecture & Tech Roadmap', included: true },
        { text: 'Daily Strategy Huddle (30 mins)', included: true },
        { text: 'Vendor & Tool Selection', included: true },
        { text: 'Hiring Pipeline Consulting', included: true },
        { text: 'Rollover Hours (Up to 30 Days)', included: true },
        { text: 'Priority Slack & 24/7 Escalation', included: true },
        { text: '2 Senior Devs + Tech Lead', included: true },
      ],
      highlighted: false,
    },
  ];

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'ELVERSE40') {
      setAppliedDiscount(true);
    }
  };

  const handleBookConsultation = () => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">
            Pricing
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Pay Daily. Pause Anytime. Scale as You Grow.
          </h3>
          <p className="text-lg text-slate-400">
            No long contracts. No surprise invoices. Just code shipped daily.
          </p>
        </div>

        {/* Discount Banner */}
        <div className="bg-cyan-100 border-2 border-cyan-300 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-indigo-900 font-bold text-lg mb-2">
              🎉 LAUNCH SPECIAL: First 7 Days at 40% Off on All Plans
            </p>
            <p className="text-indigo-800">
              Use Code: <span className="font-bold">ELVERSE40</span> • Discount applied automatically at checkout • Cancel anytime
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 relative transition transform hover:scale-105 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 border-2 border-cyan-300 scale-105 shadow-2xl shadow-cyan-500/30'
                  : 'bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-cyan-500/30'
              }`}
            >
              {plan.badge && (
                <div className={`text-xs font-bold inline-block px-3 py-1 rounded-full mb-4 ${
                  plan.highlighted
                    ? 'bg-white text-cyan-600'
                    : 'bg-cyan-600 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-3xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                    ${plan.salePrice}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-400'}`}>
                    /day
                  </span>
                </div>
                <p className={`text-sm line-through ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                  ${plan.originalPrice}/day
                </p>
                <p className={`text-xs mt-2 ${plan.highlighted ? 'text-blue-50' : 'text-slate-400'}`}>
                  (Billed daily. Approx ${Math.round(plan.monthlyEquivalent)}/mo)
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`text-sm flex items-start ${
                      plan.highlighted ? 'text-white' : 'text-slate-300'
                    } ${!feature.included && 'opacity-50'}`}
                  >
                    <span className="mr-3 flex-shrink-0">
                      {feature.included ? '✅' : '❌'}
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.link/aps8r5"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-semibold transition text-center block ${
                  plan.highlighted
                    ? 'bg-white text-cyan-600 hover:bg-slate-100'
                    : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                }`}
              >
                Start 7-Day Trial →
              </a>

              <p className={`text-xs text-center mt-3 ${plan.highlighted ? 'text-blue-100' : 'text-slate-400'}`}>
                Have a promo code?{' '}
                <button
                  onClick={applyPromo}
                  className={`underline ${plan.highlighted ? 'hover:text-white' : 'hover:text-slate-300'}`}
                >
                  Apply here
                </button>
              </p>
            </div>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-white text-xs font-bold mb-4">🏢 FOR GROWING TEAMS & AGENCIES</div>
              <h4 className="text-3xl font-bold text-white mb-4">Need a Custom Plan?</h4>
              <p className="text-indigo-200 text-sm">
                Multiple projects? Dedicated team required? Longer commitment? We build tailored solutions for companies scaling fast.
              </p>
            </div>

            <div>
              <ul className="space-y-3 mb-8 text-indigo-100">
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">Custom Hour Allocations (10+ hrs/day)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">Volume Discounts (10-30% off daily rate)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">Monthly Retainer Billing Option</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">NDA & Custom Security Agreements</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">White-Label Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm">Priority Support & SLA Customization</span>
                </li>
              </ul>
              <button
                onClick={handleBookConsultation}
                className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-indigo-900 font-bold rounded-lg transition"
              >
                Book a Custom Consultation →
              </button>
              <p className="text-xs text-indigo-300 mt-3 text-center">
                Typical response within 2 hours. No obligation call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
