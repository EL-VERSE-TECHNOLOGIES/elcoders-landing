'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Our projects typically take 8-16 weeks from discovery to launch, depending on complexity. We provide detailed timelines during the planning phase tailored to your specific requirements.',
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern, scalable technologies including Next.js, React, Node.js, TypeScript, Tailwind CSS, and various cloud platforms. We choose the best tools for each project&apos;s specific needs.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! All projects include ongoing support and maintenance. We offer various support packages including bug fixes, feature updates, and performance optimization.',
    },
    {
      question: 'Can you work with our existing codebase?',
      answer: 'Absolutely. We have experience integrating with existing systems, migrating legacy code, and extending current applications. We&apos;ll assess your codebase and provide recommendations.',
    },
    {
      question: 'What if I need to make changes during development?',
      answer: 'We follow an agile methodology with regular sprints and client communication. Changes can be accommodated, and we&apos;ll discuss scope adjustments and timeline impacts transparently.',
    },
    {
      question: 'How do you ensure quality and security?',
      answer: 'We implement rigorous testing, code reviews, security audits, and follow industry best practices. All deliverables undergo comprehensive QA testing before deployment.',
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
