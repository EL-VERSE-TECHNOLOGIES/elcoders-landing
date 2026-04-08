'use client';

import { useState } from 'react';

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 50000,
      description: 'Perfect for small projects',
      features: [
        'Up to 5 pages',
        'Basic SEO optimization',
        'Mobile responsive',
        ' 3 months support',
        'Free hosting for 1 year',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 150000,
      description: 'Ideal for growing businesses',
      features: [
        'Up to 20 pages',
        'Advanced SEO',
        'E-commerce integration',
        '12 months support',
        'SSL & security setup',
        'Performance optimization',
      ],
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 500000,
      description: 'For large-scale projects',
      features: [
        'Unlimited pages',
        'Custom development',
        'AI integration',
        '24/7 priority support',
        'Dedicated team',
        'Advanced analytics',
        'White-label options',
      ],
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !email) {
      alert('Please select a plan and enter your email');
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    try {
      // Initialize payment with Korapay
      const reference = `elcoders_${Date.now()}`;
      const response = await fetch('/api/korapay/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: plan.price / 100, // Convert kobo to naira
          reference,
          metadata: {
            plan: plan.name,
            plan_id: plan.id,
          },
        }),
      });

      const data = await response.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400">
            Choose the perfect plan for your project needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`rounded-2xl p-8 cursor-pointer transition transform hover:scale-105 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-blue-400 scale-105'
                  : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
              } ${selectedPlan === plan.id ? 'ring-2 ring-cyan-400' : ''}`}
            >
              {plan.highlighted && (
                <div className="text-xs font-bold text-white bg-cyan-600 inline-block px-3 py-1 rounded-full mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-slate-400'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                  ₦{(plan.price / 1000).toFixed(0)}K
                </span>
                <p className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-400'}`}>
                  per project
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`text-sm flex items-center ${
                      plan.highlighted ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    <span className="mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-slate-100'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Complete Your Order</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Have a promo code?"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
