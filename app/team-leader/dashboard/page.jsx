'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Page() {
  const router = useRouter();

  const handleTaskChange = (e) => {
    const value = e.target.value;
    if (value === '70') {
      router.push('/team-leader/leader-taskform1'); 
    } else if (value === '10') {
      router.push('/team-leader/leader-taskform2'); 
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Search Bar */}
      <div className="flex justify-center mt-4">
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-sky-500" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full py-3.5 pl-12 pr-4 bg-white border border-gray-100 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#8D92EB]/50 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-2 w-full max-w-xl justify-between px-8 py-3">
          <Link href="/team-leader/overview" className="text-xs font-semibold text-gray-700 hover:text-black transition-colors">
            Overview
          </Link>
          <Link href="/team-leader/board" className="text-xs font-semibold text-gray-700 hover:text-black transition-colors">
            Board
          </Link>
          <Link href="/team-leader/calendar" className="text-xs font-semibold text-gray-700 hover:text-black transition-colors">
            Calendar
          </Link>
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Team Leader Tasks Evaluation Card */}
        <div className="bg-white rounded-[1.25rem] shadow-sm border border-gray-50 p-8 h-full flex flex-col">
          <h2 className="text-[1.35rem] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Team Leader Tasks Evaluation
          </h2>
          
          <div className="mt-2">
            <div className="relative">
              <select
                defaultValue=""
                onChange={handleTaskChange}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-3 px-4 pr-10 text-sm text-gray-600 focus:outline-none focus:border-[#8D92EB] focus:ring-1 focus:ring-[#8D92EB] transition-colors"
              >
                <option value="" disabled>Select Task type</option>
                <option value="70">Task out of 70%</option>
                <option value="10">Task out of 10%</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Tasks Card */}
        <div className="bg-white rounded-[1.25rem] shadow-sm border border-gray-50 p-8 h-full flex flex-col">
          <h2 className="text-[1.35rem] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Employee Tasks
          </h2>
          
          <div className="flex flex-col gap-4 mt-2">
            <Link
              href="/team-leader/peer-evaluation"
              className="bg-[#8D92EB] hover:bg-[#7a7fd8] text-white text-sm font-semibold py-3 px-6 rounded-lg text-center transition-colors w-full"
            >
              + Create Peer Tasks
            </Link>
            <Link
              href="/team-leader/self-evaluationform"
              className="bg-[#8D92EB] hover:bg-[#7a7fd8] text-white text-sm font-semibold py-3 px-6 rounded-lg text-center transition-colors w-full"
            >
              + Create Self-Evaluation Tasks
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
