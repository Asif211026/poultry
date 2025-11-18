const categoryColors = {
  'Broiler': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  'Desi': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  'Leghorn': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'Hyderabadi': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
  'Eggs': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
}

export default function LowStockItem({ 
  itemName, 
  category, 
  currentStock, 
  threshold, 
  unit 
}) {
  const colors = categoryColors[category] || categoryColors['Broiler']
  const stockPercentage = (currentStock / threshold) * 100
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header with name and low stock badge */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{itemName}</h4>
        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
          Low Stock
        </span>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
          {category}
        </span>
      </div>

      {/* Stock Information */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Current Stock</span>
          <span className="font-semibold text-gray-900">
            {currentStock} / {threshold} {unit}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Stock Status */}
      <p className="text-xs text-gray-600">
        {threshold - currentStock} {unit} below threshold
      </p>
    </div>
  )
}
