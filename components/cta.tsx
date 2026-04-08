'use client';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Ship Code Tomorrow?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto text-balance">
            Stop hiring, stop waiting. Get dedicated developers shipping features daily. First 7 days at 40% off. No contracts. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.link/aps8r5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
            >
              Start 7-Day Trial Now
            </a>
            <a
              href="https://wa.link/oktez7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              Chat with Our Team
            </a>
          </div>

          <p className="text-blue-100 text-sm mt-6">
            ✓ First day risk-free • ✓ No credit card needed • ✓ Chat with founder directly
          </p>
        </div>

        {/* Social proof badges */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">40+</div>
            <div className="text-blue-50 text-sm">SaaS Founders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-blue-50 text-sm">Hours Shipped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="text-blue-50 text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
