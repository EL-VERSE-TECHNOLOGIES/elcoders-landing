'use client';

export function Features() {
  const features = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Full-stack web applications built with modern technologies for scalability and performance.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users and drive conversions.',
    },
    {
      icon: '🤖',
      title: 'AI Solutions',
      description: 'Intelligent automation and machine learning solutions tailored to your needs.',
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android with native performance.',
    },
    {
      icon: '☁️',
      title: 'Cloud Infrastructure',
      description: 'Scalable, secure cloud solutions with 99.9% uptime guarantee.',
    },
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Enterprise-grade security with encryption, compliance, and regular audits.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            What We Do Best
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We specialize in delivering comprehensive solutions that transform your digital presence and drive measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
