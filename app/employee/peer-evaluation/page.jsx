'use client';
import React, { useState, useEffect } from 'react';

export default function PeerEvaluation() {
  const [employees, setEmployees] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalRank, setTotalRank] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      try {
        const res = await fetch('/api/team/members');
        const data = await res.json();
        setEmployees(Array.isArray(data.users) ? data.users : []);
      } catch (err) {
        setMessage(`❌ Error fetching employees: ${err.message}`);
      }
      setLoading(false);
    }
    fetchEmployees();
  }, []);

  const handleEmployeeChange = async (e) => {
    const empId = e.target.value;
    const employee = employees.find(emp => (emp._id || emp.id) === empId);
    setSelectedEmployee(employee || null);
    setTotal(0);
    setTotalRank(0);
    setTaskData([]);

    if (!employee) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks?assignedTo=${encodeURIComponent(empId)}&category=peer_evaluation`);
      const tasks = await res.json();
      if (res.ok) {
        const rows = Array.isArray(tasks)
          ? tasks.flatMap(t => (t.evaluationCriteria || []).map((c, idx) => ({
              id: `${t._id}-${idx}`,
              name: c.criterion,
              weight: c.weight,
              rank: 0,
            })))
          : [];
        setTaskData(rows);
      } else {
        setMessage('❌ Failed to fetch tasks');
      }
    } catch (err) {
      setMessage(`❌ Error fetching tasks: ${err.message}`);
    }
    setLoading(false);
  };

  const getScore = (rank, weight) => (((rank * weight) / 4)*0.15);

  const calculateTotals = (data) => {
    const rankSum = data.reduce((sum, t) => sum + (t.rank || 0), 0);
    const scoreSum = data.reduce((sum, t) => sum + getScore(t.rank || 0, t.weight || 0), 0);
    setTotalRank(rankSum);
    setTotal(scoreSum);
  };

  const handleRankChange = (index, rank) => {
    const updated = [...taskData];
    updated[index].rank = parseInt(rank);
    setTaskData(updated);
    calculateTotals(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      setMessage('❌ Please select an employee first!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const payload = {
        evaluateeId: selectedEmployee._id || selectedEmployee.id,
        tasks: taskData,
        totalRank,
        totalScore: total,
        date: new Date().toISOString()
      };

      const res = await fetch('/api/peer-evaluation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Evaluation for ${(selectedEmployee.fullName || selectedEmployee.name)} submitted successfully!`);
      } else {
        setMessage(`❌ Failed to submit: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Peer Evaluation Task
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Evaluate your team members by selecting their name and accurately scoring their performance on the criteria provided.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 space-y-8"
      >
        <div className="max-w-md">
          <label className="block mb-2 font-medium text-gray-700 text-sm">Select Employee to Evaluate</label>
          <select
            onChange={handleEmployeeChange}
            value={(selectedEmployee?._id || selectedEmployee?.id) || ''}
            className="w-full h-11 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            disabled={loading}
          >
            <option value="">-- Choose Employee --</option>
            {employees.map(emp => (
              <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.fullName || emp.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEmployee && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {[
              { label: 'Full Name', value: selectedEmployee.name || selectedEmployee.fullName },
              { label: 'Job Type', value: selectedEmployee.jobType },
              { label: 'Evaluation', value: selectedEmployee.evaluation },
              { label: 'Position', value: selectedEmployee.position },
              { label: 'Year', value: selectedEmployee.year || new Date().getFullYear() },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{field.label}</label>
                <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm font-medium">
                  {field.value || '-'}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedEmployee && taskData.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">No.</th>
                  <th className="px-4 py-3 font-semibold w-1/3">Criteria</th>
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
                          disabled={loading}
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
        )}

        {selectedEmployee && taskData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-indigo-50">
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Rank</span>
              <span className="text-3xl font-bold text-gray-800">{totalRank.toFixed(2)}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-indigo-50">
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Score (15%)</span>
              <span className="text-3xl font-bold text-indigo-600">{total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {message && (
          <div className={`p-4 rounded-lg text-center font-medium ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        {selectedEmployee && taskData.length > 0 && (
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
        )}
      </form>
    </div>
  );
}