import Footer from '@/app/employee/footer/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans">
      <nav className="border-b border-slate-800 bg-[#0f172a] fixed top-0 w-full z-50 px-6 h-16 flex items-center">
        <Link href="/" className="text-white font-bold tracking-wide">PerformCore</Link>
      </nav>
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-32 w-full">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-white mb-6">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: April 23, 2026</p>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when utilizing the PerformCore system. This includes basic employee data, authentication credentials, and evaluation metrics required to calculate performance indices.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p>The information we collect is used solely to provide, maintain, and improve the evaluation workflows. Peer scores, self-evaluations, and administrative tasks are isolated to authorized organizational channels via secure NextAuth sessions.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
              <p>We implement strict, industry-standard security measures including `bcryptjs` password hashing and robust Mongoose strict-schema validation to protect your personal and organizational evaluation data from unauthorized access.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact your system administrator or reach out via our official contact page.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
