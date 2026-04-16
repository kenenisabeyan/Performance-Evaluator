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
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15]">
            Elevate Your Team&apos;s <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400">
              True Potential
            </span>
          </h1
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The intelligent platform for goal tracking, 360° evaluations, and actionable analytics. 
            Empower your workforce with continuous, data-driven feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/auth/login" 
              className="group w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-[0_0_30px_rgba(79,70,229,0.25)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
            >
              Get started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all backdrop-blur-sm"
            >
              Learn more
            </a>
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
