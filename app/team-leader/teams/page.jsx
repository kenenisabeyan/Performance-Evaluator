'use client'
import { useState, useEffect } from 'react'

export default function SingleTeam() {
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-red-100 text-red-700',
    Pending: 'bg-yellow-100 text-yellow-700',
  }

  useEffect(() => {
    async function fetchTeam() {
      setLoading(true)
      try {
        const res = await fetch('/api/team/members')
        const data = await res.json()
        setTeam({ name: 'My Team', members: (data.users || []).map(u => ({
          name: u.fullName,
          email: u.email,
          phone: '',
          status: 'Active'
        })) })
      } catch (err) {
        setTeam(null)
      }
      setLoading(false)
    }
    fetchTeam()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">No team data found.</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
        Team: {team.name}
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="border-b border-gray-200 text-sm bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-xl">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.members.map((member, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {member.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        statusColors[member.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
              {team.members.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 border-dashed">
                    No members in this team.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}