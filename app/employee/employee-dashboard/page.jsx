import { FaArrowRightToBracket } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function EmployeeDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <header className="w-full text-center border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Evaluation Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Manage your tasks and review your performance evaluations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="group bg-white text-gray-800 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transform transition-all duration-300 p-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 text-center">
              Self Evaluation Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/employee/self-evaluation-form" 
              className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-medium group-hover:text-indigo-800 transition"
            >
              <FaArrowRightToBracket className="text-xl" /> Self Evaluation
            </Link>
          </CardContent>
        </Card>

        <Card className="group bg-white text-gray-800 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transform transition-all duration-300 p-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 text-center">
              Peer Evaluation Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/employee/peer-evaluation" 
              className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-medium group-hover:text-indigo-800 transition"
            >
              <FaArrowRightToBracket className="text-xl" /> See the Peer Task
            </Link>
          </CardContent>
        </Card>

        <Card className="group bg-white text-gray-800 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transform transition-all duration-300 p-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 text-center">
              My Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/employee/employee-result" 
              className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-medium group-hover:text-indigo-800 transition"
            >
              <FaArrowRightToBracket className="text-xl" /> See Your Result
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
