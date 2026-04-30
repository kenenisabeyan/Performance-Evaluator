'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '' });
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    // Add logic here
    setTimeout(() => setPending(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[url('/image/astuget1.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0" />

      {/* Main Content - Centered */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl backdrop-blur-md bg-white/95 rounded-xl border border-gray-200">
          <CardHeader className="space-y-4 pb-6 border-b border-gray-100 mb-6">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Image
                src="/image/astuLogo.png"
                alt="ASTU Logo"
                width={70}
                height={70}
                className="rounded-full shadow-md"
              />
              <h1 className="text-xl font-bold text-gray-800 text-center uppercase tracking-wide">
                ASTU Staff Performance Evaluator
              </h1>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center space-y-1.5 mb-6">
              <h2 className="text-[24px] font-bold text-[#0f172a] tracking-tight">Forgot Password</h2>
              <p className="text-[#64748b] text-[14px]">Enter your email to easily retrieve a new password.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  disabled={pending}
                  value={form.email}
                  onChange={(e) => setForm({ email: e.target.value })}
                  placeholder=" "
                  className="peer h-12 px-5 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-full transition-all"
                  required
                />
                <label className="absolute left-4 -top-2.5 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm">
                  Email
                </label>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-md"
              >
                {pending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Continue'}
              </Button>
            </form>

            <Separator className="my-5" />
            
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
