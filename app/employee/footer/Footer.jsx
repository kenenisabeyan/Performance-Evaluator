import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 py-6">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 mb-4 text-sm font-semibold tracking-wide text-white">
              <span className="block h-2 w-2 rounded-full bg-blue-400" />
              PerformCore
            </div>
            <p className="max-w-xl text-sm text-slate-400 leading-relaxed">
              Simple performance management for teams that want clear feedback, smart goals, and better growth conversations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white mb-3">Company</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Resources</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors duration-200">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Support</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Need help? Reach out via the contact page and we&apos;ll assist you quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {currentYear} PerformCore. All rights reserved.</p>
          <p className="text-slate-400">Built for simple, user-friendly employee evaluation.</p>
        </div>
      </div>
    </footer>
  );
}
