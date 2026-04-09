'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              ELCODERS
            </h3>
            <p className="text-slate-400 text-sm">
              Transforming visions into digital reality with innovation and expertise.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition">Web Development</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">AI Solutions</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Mobile Apps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Our Work</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="https://wa.link/d4oxqj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="mailto:elcoderssofwares12@gmail.com"
                  className="hover:text-cyan-400 transition"
                >
                  Email
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/ElVerse27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  Twitter
                </a>
              </li>
              <li><a href="#" className="hover:text-cyan-400 transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} EL VERSE TECHNOLOGIES. Daily Velocity, Zero Fluff.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-slate-500 hover:text-slate-400 text-sm transition">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-slate-500 hover:text-slate-400 text-sm transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
