export default function ReportSummaryCard({ icon: Icon, title, value, bgColor, iconColor, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${bgColor} ${iconColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
