import { Edit, Eye, FileText, Star, ChevronDown } from 'lucide-react'
import { useState } from 'react'
const statusColors = {
  Published: 'bg-green-100 text-green-700',
  'In Review': 'bg-yellow-100 text-yellow-700',
  Draft: 'bg-gray-100 text-gray-700'
}
export default function ContentTable({ content }) {
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  function handleSort(field) {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDir('desc')
    }
  }
  function getSortedContent() {
    return [...content].sort((a, b) => {
      if (sortBy === 'date') {
        return sortDir === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      }
      if (sortBy === 'views' || sortBy === 'citations') {
        return sortDir === 'asc'
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy]
      }
      return 0
    })
  }
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              onClick={() => handleSort('views')}
            >
              <div className="flex items-center gap-1">
                <Eye size={16} className="inline" />
                Views
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortBy === 'views' && sortDir === 'asc' ? 'rotate-180' : ''}`}
                />
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              onClick={() => handleSort('citations')}
            >
              <div className="flex items-center gap-1">
                <Star size={16} className="inline" />
                Citations
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortBy === 'citations' && sortDir === 'asc' ? 'rotate-180' : ''}`}
                />
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center gap-1">
                <FileText size={16} className="inline" />
                Date
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortBy === 'date' && sortDir === 'asc' ? 'rotate-180' : ''}`}
                />
              </div>
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {getSortedContent().map(item => (
            <tr key={item.id} className="hover:bg-blue-50 transition">
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3">{item.author}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[item.status]}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">{item.views}</td>
              <td className="px-4 py-3">{item.citations}</td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3">
                <button className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:underline rounded">
                  <Edit size={16} />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}