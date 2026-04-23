'use client'

import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'

export default function RolesPermissions() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/roles')
      if (!res.ok) throw new Error('Failed to fetch roles')
      const data = await res.json()
      setRoles(data.roles || [])
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  if (loading) return <p className="text-center mt-10 animate-pulse text-indigo-600 font-medium">Loading roles...</p>
  if (error) return <p className="text-center text-red-500 mt-10 font-medium">{error}</p>

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Roles & Permissions
        </h1>
        <p className="text-gray-500 mt-2 text-sm font-medium">
          Manage system access levels and operational permissions for your organization.
        </p>
      </div>

      <Card className="p-0 shadow-sm border border-gray-200 rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold text-left w-1/4">Role</th>
                <th className="px-6 py-4 font-semibold text-left w-1/4">Description</th>
                <th className="px-6 py-4 font-semibold text-left w-2/4">Permissions</th>
                <th className="px-6 py-4 font-semibold text-center">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((r) => (
                <tr key={r.role} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 capitalize">{r.role}</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">{r.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(r.permissions) ? r.permissions.map(p => (
                        <span key={p} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium border border-indigo-100">{p}</span>
                      )) : r.permissions}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700">
                    {Array.isArray(r.users) ? r.users.length : 0}
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
