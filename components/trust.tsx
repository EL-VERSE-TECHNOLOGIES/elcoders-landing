'use client';

export function Trust() {
  const logos = [
    { name: 'Atmos', initials: 'AT' },
    { name: 'FlowState', initials: 'FS' },
    { name: 'Nexus', initials: 'NX' },
    { name: 'CoreAI', initials: 'CA' },
    { name: 'BuildShip', initials: 'BS' },
  ];

  return (
    <section className="py-12 bg-slate-950 border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-slate-400 mb-8">
          Trusted by 40+ SaaS Founders to keep their codebase moving.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold"
            >
              {logo.initials}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
