'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SelfEvaluation() {
  const [user, setUser] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalRank, setTotalRank] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch('/api/employee/profile');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        }

        const taskRes = await fetch('/api/employee/tasks');
        if (taskRes.ok) {
          const taskData = await taskRes.json();
          const tasks = taskData.tasks || [];
          setTaskData(tasks);
          calculateTotals(tasks);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/self-evaluation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          tasks: taskData,
          total,
          totalRank,
        }),
      });
      if (res.ok) {
        setMessage('Evaluation submitted successfully!');
      } else {
        setMessage('Failed to submit evaluation.');
      }
    } catch (err) {
      setMessage('Error submitting evaluation.');
    }
    setLoading(false);
  };

  const handleRankChange = (index, rank) => {
    const updated = [...taskData];
    updated[index].rank = rank;
    setTaskData(updated);
    calculateTotals(updated);
  };

  const getScore = (rank, weight) => (rank * weight) / 4;

  const calculateTotals = (data) => {
    const rankSum = data.reduce((sum, t) => sum + (t.rank || 0), 0);
    const scoreSum = data.reduce((sum, t) => sum + getScore(t.rank || 0, t.weight || 0), 0);
    setTotalRank(rankSum);
    setTotal(scoreSum);
  };

  if (!user || taskData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Self Evaluation Form
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Please carefully review and score your performance on the following assigned tasks.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
          {[
            { label: 'Full Name', value: user?.fullName || '' },
            { label: 'Position', value: user?.position || '' },
            { label: 'Department', value: user?.department || '' },
            { label: 'Employee ID', value: user?.employeeId || '' },
            { label: 'Year', value: new Date().getFullYear() },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{field.label}</label>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm font-medium">
                {field.value || '-'}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">No.</th>
                <th className="px-4 py-3 font-semibold w-1/3">Task Name</th>
                <th className="px-4 py-3 font-semibold text-center">Weight (%)</th>
                <th colSpan="4" className="px-4 py-3 font-semibold text-center">Ranking (1-4)</th>
                <th className="px-4 py-3 font-semibold text-right">Score</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs">
                <th colSpan="3"></th>
                <th className="px-2 py-2 text-center border-l border-gray-200">1 (Poor)</th>
                <th className="px-2 py-2 text-center border-l border-gray-200">2 (Fair)</th>
                <th className="px-2 py-2 text-center border-l border-gray-200">3 (Good)</th>
                <th className="px-2 py-2 text-center border-l border-r border-gray-200">4 (Exc.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {taskData.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                  <td className="px-4 py-3 text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-center font-medium text-gray-600">{item.weight}%</td>
                  {[1, 2, 3, 4].map((num) => (
                    <td key={`rank-${item.id}-${num}`} className="px-2 py-3 text-center border-l border-gray-100">
                      <input
                        type="radio"
                        name={`rank-${i}`}
                        value={num}
                        checked={item.rank === num}
                        onChange={() => handleRankChange(i, num)}
                        className="w-4 h-4 cursor-pointer text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right font-bold text-indigo-600 border-l border-gray-100">
                    {getScore(item.rank, item.weight).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-indigo-50">
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Rank</span>
            <span className="text-3xl font-bold text-gray-800">{totalRank.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-indigo-50">
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Score</span>
            <span className="text-3xl font-bold text-indigo-600">{total.toFixed(2)}</span>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </div>
      </form>
    </div>
  );
}