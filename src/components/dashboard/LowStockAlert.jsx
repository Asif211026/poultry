import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LowStockAlert({ itemCount = 3 }) {
  return (
    <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <AlertTriangle size={28} className="text-amber-600 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-amber-900">Low Stock Alert</h3>
          <p className="text-amber-700 text-sm">
            {itemCount} {itemCount === 1 ? 'item is' : 'items are'} running low on stock
          </p>
        </div>
      </div>
      <Link
        to="/stock"
        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium whitespace-nowrap"
      >
        Manage Stock
      </Link>
    </div>
  )
}
