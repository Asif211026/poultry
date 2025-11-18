export default function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  bgColor, 
  iconColor, 
  trend 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        {/* Icon Section */}
        <div className={`${bgColor} ${iconColor} p-4 rounded-lg`}>
          <Icon size={28} />
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span className="text-green-600 text-sm font-medium">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
