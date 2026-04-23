'use client'
import { useState, useEffect } from 'react'
import { CalendarDays } from 'lucide-react'
import Link from 'next/link'

export default function CalendarPage() {
  const [evaluations, setEvaluations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const res = await fetch('/api/team/calendar')
        const data = await res.json()
        setEvaluations(Array.isArray(data) ? data : [])
      } catch (err) {
        setEvaluations([])
      }
      setLoading(false)
    }
    fetchEvaluations()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
        Employee Evaluation Calendar
      </h1>
      
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {evaluations.map((evalItem) => (
          <div
            key={evalItem.id}
            className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-900">{evalItem.name}</h2>
            <p className="text-sm text-gray-500 mt-2 mb-3">Date: {evalItem.date}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase inline-block mb-5 ${
                evalItem.type === 'Task'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {evalItem.type}
            </span>
            <Link
              href={`https://calendar.google.com/calendar/r/eventedit?text=Evaluation+-+${encodeURIComponent(evalItem.name)}&dates=${evalItem.date.replace(/-/g, '')}T090000Z/${evalItem.date.replace(/-/g, '')}T100000Z`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-semibold text-[#8D92EB] hover:text-[#6a6fcd] transition-colors"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Add to Calendar
            </Link>
          </div>
        ))}
        {evaluations.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
            No calendar events found.
          </div>
        )}
      </div>
    </div>
  )
}