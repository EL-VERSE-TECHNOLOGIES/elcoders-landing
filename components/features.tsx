'use client';

export function Features() {
  const features = [
    {
      icon: '⏱️',
      title: 'Zero-Day Onboarding',
      description: 'We join your repo and Slack today. First commit tomorrow by 11 AM.',
    },
    {
      icon: '🔓',
      title: 'No 6-Month Lock-In',
      description: 'Pause or cancel daily. We earn our seat every single day.',
    },
    {
      icon: '🎬',
      title: 'Daily Standup Loom',
      description: 'Wake up to a 45-sec video update. Never chase status updates again.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            The ELCODERS Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition transform hover:scale-105 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
