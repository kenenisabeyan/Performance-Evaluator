import Footer from '@/app/employee/footer/Footer';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans">
      <nav className="border-b border-slate-800 bg-[#0f172a] fixed top-0 w-full z-50 px-6 h-16 flex items-center">
        <Link href="/" className="text-white font-bold tracking-wide">PerformCore</Link>
      </nav>
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-32 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg">Have a question or need support? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full"><Mail className="text-blue-400 w-6 h-6"/></div>
              <div>
                <h3 className="text-lg font-bold text-white">Email</h3>
                <p className="text-slate-400 mt-1">support@performcore.example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-full"><Phone className="text-indigo-400 w-6 h-6"/></div>
              <div>
                <h3 className="text-lg font-bold text-white">Phone</h3>
                <p className="text-slate-400 mt-1">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-500/10 rounded-full"><MapPin className="text-violet-400 w-6 h-6"/></div>
              <div>
                <h3 className="text-lg font-bold text-white">Office</h3>
                <p className="text-slate-400 mt-1">123 Evaluation St.<br/>Tech District, CA 94103</p>
              </div>
            </div>
          </div>

          <form className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
