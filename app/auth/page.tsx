import Link from 'next/link';
import { ArrowRight, Code2, Briefcase } from 'lucide-react';

export default function AuthChoice() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            Join ELCODERS
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto text-balance">
            Select your role and get started with premium digital solutions
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Client Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 transition duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">I'm a Client</h2>
              
              <p className="text-slate-300 mb-6">
                Hire senior developers to build your web apps, mobile apps, or AI solutions. No contracts, no lock-in.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-slate-300">Get dedicated development team</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-slate-300">First 7 days at 40% off</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-slate-300">Daily code shipping guarantee</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-slate-300">$49/day or custom pricing</span>
                </div>
              </div>

              <Link
                href="/auth/client"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105 group"
              >
                Sign Up as Client
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          {/* Developer Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-pink-500 transition duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Code2 className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">I'm a Developer</h2>
              
              <p className="text-slate-300 mb-6">
                Join our elite team and work on high-impact projects. Flexible roles, competitive rates.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 font-bold">✓</span>
                  <span className="text-slate-300">Remote-first opportunities</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 font-bold">✓</span>
                  <span className="text-slate-300">Work on cutting-edge tech</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 font-bold">✓</span>
                  <span className="text-slate-300">Competitive compensation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 font-bold">✓</span>
                  <span className="text-slate-300">Showcase your tech stack</span>
                </div>
              </div>

              <Link
                href="/auth/developer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition transform hover:scale-105 group"
              >
                Sign Up as Developer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Already have an account?{' '}
            <a href="https://wa.link/oktez7" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
