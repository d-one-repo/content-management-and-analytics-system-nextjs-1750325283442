import { Home, Menu, Search, FileText, Layers, Star, Edit, Eye, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ContentTable from '../components/ContentTable'
import AnalyticsPanel from '../components/AnalyticsPanel'
const sampleContent = [
  {
    id: 1,
    title: "Minimally Invasive Surgery: A Review",
    author: "Dr. Alice Smith",
    status: "Published",
    views: 1240,
    citations: 32,
    date: "2024-05-10"
  },
  {
    id: 2,
    title: "Robotics in Modern Surgery",
    author: "Dr. John Doe",
    status: "In Review",
    views: 980,
    citations: 12,
    date: "2024-06-01"
  },
  {
    id: 3,
    title: "AI-Assisted Diagnosis in Oncology",
    author: "Dr. Emily Zhang",
    status: "Draft",
    views: 210,
    citations: 0,
    date: "2024-06-12"
  },
  {
    id: 4,
    title: "Trends in Cardiothoracic Procedures",
    author: "Dr. Michael Brown",
    status: "Published",
    views: 1560,
    citations: 45,
    date: "2024-04-22"
  }
]
export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredContent, setFilteredContent] = useState(sampleContent)
  function handleSearch(e) {
    const value = e.target.value
    setSearch(value)
    setFilteredContent(
      sampleContent.filter(
        item =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.author.toLowerCase().includes(value.toLowerCase())
      )
    )
  }
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <Home size={28} className="text-blue-600" />
            <h1 className="text-2xl font-bold tracking-tight">Springer Content Management & Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search articles or authors..."
                className="pl-10 pr-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <FileText size={22} className="text-gray-500" />
              <Layers size={22} className="text-gray-500" />
              <Star size={22} className="text-yellow-500" />
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 flex flex-col lg:flex-row gap-6">
          <section className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Edit size={22} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Editorial Workflow</h2>
            </div>
            <ContentTable content={filteredContent} />
          </section>
          <aside className="w-full lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={22} className="text-green-600" />
              <h2 className="text-xl font-semibold">Content Analytics</h2>
            </div>
            <AnalyticsPanel content={sampleContent} />
          </aside>
        </main>
      </div>
    </div>
  )
}