import { Edit2, Trash2 } from 'lucide-react'

function StatusBadge({ status }) {
  if (status === 'In Stock') return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
  if (status === 'Low Stock') return <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Low Stock</span>
  return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
}

export default function StockTable({ stockItems = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Item Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Cost Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Selling Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {stockItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.category}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.quantity} {item.unit}</td>
              <td className="px-4 py-3 text-sm text-gray-900">₹{item.costPrice.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-900">₹{item.sellingPrice.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-900"><StatusBadge status={item.status} /></td>
              <td className="px-4 py-3 text-right text-sm">
                <button onClick={() => onEdit(item)} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mr-2">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(item.id)} className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}\n        </tbody>
      </table>
      </div>

      {stockItems.length === 0 && (
        <div className="p-6 text-center text-gray-500">No items found.</div>
      )}
    </div>
  )
}
