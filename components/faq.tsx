'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What if I don&apos;t have 1 hour of work every single day?',
      answer: 'Hours roll over! Scout plan rolls 7 days. Squad rolls 14 days. CTO rolls 30 days. Bank hours for bigger sprints.',
    },
    {
      question: 'What tech stack do you work with?',
      answer: 'React, Next.js, Node, Python, Laravel, AWS, Vercel, Shopify, Webflow. If it&apos;s modern web tech, we&apos;re fluent. Just ask.',
    },
    {
      question: 'How does payment work?',
      answer: 'We invoice daily at midnight UTC. Card on file. Pause or cancel anytime from your dashboard. You&apos;re never locked in.',
    },
    {
      question: 'What&apos;s the catch with the 40% discount?',
      answer: 'No catch. We want you to experience daily velocity risk-free. Discount applies to first 7 days. Cancel before day 8, pay nothing more. Stay, and standard rates apply. You&apos;ll see the discount reflected at checkout.',
    },
    {
      question: 'Is this an agency or a freelancer?',
      answer: 'ELCODERS is the dedicated dev arm of EL VERSE TECHNOLOGIES. You get agency process (QA, Code Review, PM) with freelancer flexibility (pause daily).',
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes. Upgrade or downgrade with 1 day notice. Unused rollover hours transfer with you.',
    },
    {
      question: 'Do you offer discounts for non-profits or early-stage startups?',
      answer: 'Absolutely. We have a Founders Program. Book an Enterprise call and mention "EL VERSE Impact" for extended trial periods and reduced rates.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400">
            Have questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-700/50 transition"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <span
                  className={`text-cyan-400 text-xl flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
