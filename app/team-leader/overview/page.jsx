'use client'
import { Calendar, Users, BarChart3, Award } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function OverviewPage() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/team/overview-stats')
        const data = await res.json()
        setStats(Array.isArray(data) ? data : [])
      } catch (err) {
        setStats([])
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const iconMap = {
    Users: { icon: Users, href: '/team-leader/teams' },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Dashboard Overview</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconObj = iconMap[stat.icon]
          const Icon = IconObj?.icon
        
          const content = (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`p-3 rounded-full ${stat.color || 'bg-indigo-100 text-indigo-500'}`}>
                {Icon && <Icon size={24} />}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h2 className="text-xl font-semibold">{stat.value}</h2>
              </div>
            </div>
          )
          return IconObj?.href ? (
            <Link key={idx} href={IconObj.href}>
              {content}
            </Link>
          ) : (
            <div key={idx}>{content}</div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/employee/evaluations"
          className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
        >
          <Award className="mx-auto text-green-500 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">View Evaluations</h3>
          <p className="text-sm text-gray-500">Check employee performance records</p>
        </Link>

        <Link
          href="/team-leader/calendar"
          className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
        >
          <Calendar className="mx-auto text-yellow-500 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">Calendar</h3>
          <p className="text-sm text-gray-500">See upcoming review schedules</p>
        </Link>

        <Link
          href="/team-leader/peer-and-self-report"
          className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
        >
          <BarChart3 className="mx-auto text-purple-500 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">Reports</h3>
          <p className="text-sm text-gray-500">Analyze performance trends</p>
        </Link>
      </div>
    </div>
  )
}