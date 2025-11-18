import { useState } from 'react'
import { Edit2, Check } from 'lucide-react'

const categoryBadge = (cat) => {
  switch (cat) {
    case 'Broiler':
      return 'inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'
    case 'Desi':
      return 'inline-block px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded'
    case 'Eggs':
      return 'inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded'
    case 'Leghorn':
      return 'inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded'
    case 'Hyderabadi':
      return 'inline-block px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded'
    default:
      return 'inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded'
  }
}

export default function CustomerTypeRateTable({ rateData = [], customerType = 'wholesaler', onRateChange = () => {} }) {
  const [editingId, setEditingId] = useState(null)
  const [localValue, setLocalValue] = useState('')

  const startEdit = (id, current) => {
    setEditingId(id)
    setLocalValue(String(current))
  }

  const saveEdit = (id) => {
    const numeric = Number(localValue)
    if (isNaN(numeric)) return
    onRateChange(id, customerType, numeric)
    setEditingId(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rateData.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">No items in this category.</td>
            </tr>
          )}

          {rateData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3"><span className={categoryBadge(row.category)}>{row.category}</span></td>
              <td className="px-4 py-3 text-sm text-gray-900">{row.itemName}</td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {editingId === row.id ? (
                  <input
                    type="number"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className="w-32 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                ) : (
                  <span>₹{Number(row[customerType]).toLocaleString()}</span>
                )}
              </td>
              <td className="px-4 py-3 text-right text-sm">
                {editingId === row.id ? (
                  <button onClick={() => saveEdit(row.id)} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
                    <Check size={16} />
                  </button>
                ) : (
                  <button onClick={() => startEdit(row.id, row[customerType])} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
                    <Edit2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
