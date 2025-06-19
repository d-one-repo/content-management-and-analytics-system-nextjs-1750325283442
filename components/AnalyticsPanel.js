import { Eye, Star, FileText, Calendar } from 'lucide-react'
function getTopArticle(content) {
  if (!content.length) return null
  return content.reduce((max, item) => (item.views > max.views ? item : max), content[0])
}
function getRecentArticle(content) {
  if (!content.length) return null
  return content.reduce((latest, item) =>
    new Date(item.date) > new Date(latest.date) ? item : latest, content[0]
  )
}
export default function AnalyticsPanel({ content }) {
  const totalViews = content.reduce((sum, item) => sum + item.views, 0)
  const totalCitations = content.reduce((sum, item) => sum + item.citations, 0)
  const publishedCount = content.filter(item => item.status === 'Published').length
  const inReviewCount = content.filter(item => item.status === 'In Review').length
  const draftCount = content.filter(item => item.status === 'Draft').length
  const topArticle = getTopArticle(content)
  const recentArticle = getRecentArticle(content)
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Eye size={22} className="text-blue-600" />
          <div>
            <div className="text-lg font-bold">{totalViews}</div>
            <div className="text-xs text-gray-500">Total Views</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star size={22} className="text-yellow-500" />
          <div>
            <div className="text-lg font-bold">{totalCitations}</div>
            <div className="text-xs text-gray-500">Total Citations</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-green-600" />
          <div>
            <div className="text-lg font-bold">{publishedCount}</div>
            <div className="text-xs text-gray-500">Published</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-yellow-600" />
          <div>
            <div className="text-lg font-bold">{inReviewCount}</div>
            <div className="text-xs text-gray-500">In Review</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-gray-500" />
          <div>
            <div className="text-lg font-bold">{draftCount}</div>
            <div className="text-xs text-gray-500">Drafts</div>
          </div>
        </div>
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-blue-600" />
          <span className="font-semibold text-sm">Top Article:</span>
          <span className="text-sm">{topArticle ? topArticle.title : 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-green-600" />
          <span className="font-semibold text-sm">Most Recent:</span>
          <span className="text-sm">{recentArticle ? recentArticle.title : 'N/A'}</span>
        </div>
      </div>
    </div>
  )
}