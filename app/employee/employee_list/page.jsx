'use client'

import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data.users || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: currentStatus === 'Active' ? false : true }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete employee');
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (employee) => {
    setEditingId(employee._id || employee.id);
    setEditForm({
      fullName: employee.fullName || `${employee.firstName} ${employee.lastName}`,
      department: employee.department?.name || employee.department || '',
      position: employee.position || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error('Failed to update employee');
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 animate-pulse text-indigo-600 font-medium">Loading employees...</p>
  if (error) return <p className="text-center text-red-500 mt-10 font-medium">{error}</p>

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Employee List
        </h1>
        <p className="text-gray-500 mt-2 text-sm font-medium">
          Manage, edit, or deactivate employees across the organization.
        </p>
      </div>

      <Card className="p-0 shadow-sm border border-gray-200 rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold text-left">Full Name</th>
                <th className="px-6 py-4 font-semibold text-left">Department</th>
                <th className="px-6 py-4 font-semibold text-left">Position</th>
                <th className="px-6 py-4 font-semibold text-left">Email</th>
                <th className="px-6 py-4 font-semibold text-left">Phone</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp._id || emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === (emp._id || emp.id) ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleEditChange}
                        className="border px-3 py-1.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#3b41c5] outline-none"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{emp.fullName || `${emp.firstName} ${emp.lastName}`}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {editingId === (emp._id || emp.id) ? (
                      <input
                        type="text"
                        name="department"
                        value={editForm.department}
                        onChange={handleEditChange}
                        className="border px-3 py-1.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#3b41c5] outline-none"
                      />
                    ) : (
                      emp.department?.name || emp.department || 'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {editingId === (emp._id || emp.id) ? (
                      <input
                        type="text"
                        name="position"
                        value={editForm.position}
                        onChange={handleEditChange}
                        className="border px-3 py-1.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#3b41c5] outline-none"
                      />
                    ) : (
                      emp.position || 'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#3b41c5] font-medium hover:underline cursor-pointer">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm transition-colors ${
                        emp.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                      onClick={() => toggleStatus(emp._id || emp.id, emp.isActive ? 'Active' : 'Inactive')}
                    >
                      {emp.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    {editingId === (emp._id || emp.id) ? (
                      <>
                        <button
                          onClick={() => submitEdit(emp._id || emp.id)}
                          className="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(emp)}
                          className="px-4 py-1.5 bg-[#3b41c5]/10 text-[#3b41c5] text-sm font-medium rounded-lg hover:bg-[#3b41c5]/20 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEmployee(emp._id || emp.id)}
                          className="px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
