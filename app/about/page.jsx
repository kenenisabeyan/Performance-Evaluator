import Footer from '@/app/employee/footer/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans">
      <nav className="border-b border-slate-800 bg-[#0f172a] fixed top-0 w-full z-50 px-6 h-16 flex items-center">
        <Link href="/" className="text-white font-bold tracking-wide">PerformCore</Link>
      </nav>
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-32 w-full">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-white mb-6">About PerformCore</h1>
          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            PerformCore was created with a singular mission: to make employee performance evaluations transparent, frictionless, and actionable. We believe that growth happens when expectations are clear and feedback is consistent.
          </p>
          <div className="h-px bg-slate-800 my-8"></div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            We envision a workplace where performance reviews are not feared, but embraced as a natural, continuous conversation between team members, team leaders, and administrators. Built with cutting-edge technologies, our platform provides secure, role-based workflows for peer, self, and top-down evaluations.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Founded initially as the ASTU Staff Performance Evaluator, this robust framework has scaled to provide dynamic scoring, intuitive dashboards, and data-rich reporting that simply works.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
