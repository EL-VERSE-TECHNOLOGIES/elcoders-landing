'use client';

export function Timeline() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Discovery & Planning',
      duration: '1-2 weeks',
      description: 'We understand your vision, goals, and requirements. Our team conducts thorough research and creates a detailed project roadmap.',
      tasks: ['Requirements gathering', 'Market research', 'Technical planning', 'Timeline creation'],
    },
    {
      phase: 'Phase 2',
      title: 'Design & Prototyping',
      duration: '2-3 weeks',
      description: 'Beautiful, user-centered designs that align with your brand and delight your users.',
      tasks: ['Wireframing', 'Visual design', 'Interactive prototypes', 'Client feedback'],
    },
    {
      phase: 'Phase 3',
      title: 'Development',
      duration: '4-8 weeks',
      description: 'Our expert developers bring designs to life using cutting-edge technologies and best practices.',
      tasks: ['Frontend development', 'Backend development', 'Integration', 'Testing'],
    },
    {
      phase: 'Phase 4',
      title: 'Launch & Support',
      duration: 'Ongoing',
      description: 'We deploy your project and provide comprehensive support to ensure success.',
      tasks: ['Deployment', 'Performance optimization', 'Monitoring', 'Post-launch support'],
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Our Development Process
          </h2>
          <p className="text-lg text-slate-400">
            A structured approach to deliver excellence at every stage
          </p>
        </div>

        <div className="space-y-8">
          {phases.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white mb-4">
                    {index + 1}
                  </div>
                  {index < phases.length - 1 && (
                    <div className="w-1 h-32 bg-gradient-to-b from-cyan-500 to-slate-700"></div>
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <p className="text-cyan-400 text-sm font-semibold">{item.phase}</p>
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-slate-400 text-sm mt-2 md:mt-0">{item.duration}</p>
                    </div>

                    <p className="text-slate-300 mb-6">{item.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {item.tasks.map((task, idx) => (
                        <div key={idx} className="bg-slate-700/50 rounded-lg px-3 py-2">
                          <p className="text-slate-300 text-sm">{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
