export default function CategoryCard({ category, icon: Icon, totalStock, unit, value, bgColor = 'bg-white', iconColor = 'text-gray-700' }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${bgColor} ${iconColor}`}>
          <Icon size={28} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{totalStock} {unit}</p>
          <p className="text-sm text-gray-500 mt-1">Est. value: <span className="font-medium">₹{value.toLocaleString()}</span></p>
        </div>
      </div>
    </div>
  )
}
