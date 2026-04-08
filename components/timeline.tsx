'use client';

export function Timeline() {
  const phases = [
    {
      icon: '📅',
      title: 'Pick a 15-min slot',
      description: '(Today)',
    },
    {
      icon: '🔗',
      title: 'Grant Repo Access',
      description: '(During Call)',
    },
    {
      icon: '💬',
      title: 'We join your Slack',
      description: 'Pick a bug',
    },
    {
      icon: '☕',
      title: 'Wake up to a commit',
      description: 'Done',
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">
            How It Works
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Code Shipped by Tomorrow, 11 AM
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {phases.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="text-cyan-400 text-2xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <p className="text-slate-300">
            First day risk-free. If we don&apos;t ship code, you don&apos;t pay.
          </p>
        </div>
      </div>
    </section>
  );
}
