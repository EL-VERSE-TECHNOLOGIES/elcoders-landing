'use client';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <p className="text-sm text-cyan-300 font-semibold">Limited Time Offer</p>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Stop Waiting for Code.
            <span className="block text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">Start Shipping Tomorrow.</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto text-balance">
            First 7 days at 40% off. Get senior developers shipping features daily. No contracts. No lock-in.
          </p>
          
          <p className="text-lg text-blue-200 mb-10 max-w-3xl mx-auto text-balance">
            ELCODERS: Web Apps • Mobile Apps • AI/ML • Cybersecurity • Full Stack • Azure • Blockchain
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/auth"
              className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-400/50 transition transform hover:scale-105 shadow-xl"
            >
              Start 7-Day Trial ($49/day)
            </a>
            <a
              href="https://wa.link/oktez7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/20 hover:border-white/50 transition transform hover:scale-105"
            >
              Chat with Team
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-blue-100 mb-16">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">⚡</span> First day risk-free
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">💳</span> No credit card needed
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">👨‍💼</span> Founder support
            </div>
          </div>
        </div>

        {/* Enhanced social proof section */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-10">
          <p className="text-center text-blue-200 mb-8 text-sm uppercase tracking-wide">Trusted by Founders & Teams</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center transform hover:scale-110 transition">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">40+</div>
              <div className="text-blue-200">SaaS Founders</div>
              <div className="text-xs text-blue-400 mt-1">Using daily</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">500+</div>
              <div className="text-blue-200">Dev Hours</div>
              <div className="text-xs text-blue-400 mt-1">Shipped code</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">98%</div>
              <div className="text-blue-200">Satisfaction</div>
              <div className="text-xs text-blue-400 mt-1">Client happy</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">24hrs</div>
              <div className="text-blue-200">First Commit</div>
              <div className="text-xs text-blue-400 mt-1">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
