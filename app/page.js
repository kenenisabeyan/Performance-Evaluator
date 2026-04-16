import Link from 'next/link';
import { ArrowRight, BarChart2, Users, Target, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 overflow-hidden relative font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-white/5 backdrop-blur-xl bg-black/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              PerformCore
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/login" 
              className="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-slate-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.4)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.25),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),transparent_20%)]" />
            <div className="relative text-center">
              <p className="mx-auto inline-flex items-center gap-3 rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 shadow-[0_10px_30px_rgba(14,165,233,0.14)]">
                Modern employee evaluations
              </p>
              <h1 className="mt-10 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Elevate your team&apos;s <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-indigo-400">
                  true potential
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base md:text-xl text-slate-300 leading-relaxed">
                A modern performance platform built for clear feedback, faster goals, and smarter growth conversations. Designed to look stunning and feel intuitive for every team.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/login"
                  className="group inline-flex items-center justify-center rounded-full bg-sky-500 px-9 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(56,189,248,0.25)] transition duration-300 hover:bg-sky-400"
                >
                  Get started
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-9 py-4 text-sm font-semibold text-slate-100 transition duration-300 hover:border-slate-500 hover:bg-white/10"
                >
                  Learn more
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
                {[
                  { label: 'Faster reviews', value: '3x quicker process' },
                  { label: 'Smart goals', value: 'Aligned with outcomes' },
                  { label: 'Team clarity', value: 'Feedback everyone trusts' }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {[
            {
              icon: Target,
              title: "Goal Alignment",
              desc: "Ensure every team member's objectives seamlessly align perfectly with broader company milestones.",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "group-hover:border-blue-500/30"
            },
            {
              icon: Users,
              title: "360° Feedback",
              desc: "Foster a culture of continuous growth with peer evaluations, self-reviews, and comprehensive assessments.",
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              border: "group-hover:border-indigo-500/30"
            },
            {
              icon: ShieldCheck,
              title: "Unbiased Analytics",
              desc: "Leverage intelligent insights to identify top performers and areas for improvement objectively.",
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "group-hover:border-violet-500/30"
            }
          ].map((feature, idx) => (
            <div key={idx} className={`p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300 relative group overflow-hidden hover:-translate-y-1 ${feature.border}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Decorative Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </main>
    </div>
  );
}
