import { useState } from 'react'

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

export default function QuickRateEditorTable({ rateData = [], onRateChange = () => {}, hasUnsavedChanges = false }) {
  const [editingCell, setEditingCell] = useState(null) // {id, type}

  const handleCellClick = (id, type) => {
    setEditingCell({ id, type })
  }

  const handleChange = (id, type, value) => {
    const numeric = Number(value)
    if (isNaN(numeric)) return
    onRateChange(id, type, numeric)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      {hasUnsavedChanges && (
        <div className="mb-3 text-sm text-amber-700">You have unsaved changes</div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Wholesaler</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Retailer</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Restaurant</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Customer</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rateData.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">No rate data available.</td>
            </tr>
          )}

          {rateData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <span className={categoryBadge(row.category)}>{row.category}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{row.itemName}</td>

              {['wholesaler', 'retailer', 'restaurant', 'customer'].map((type) => (
                <td key={type} className="px-4 py-3">
                  {editingCell && editingCell.id === row.id && editingCell.type === type ? (
                    <input
                      autoFocus
                      type="number"
                      step="0.01"
                      defaultValue={row[type]}
                      onBlur={(e) => setEditingCell(null)}
                      onChange={(e) => handleChange(row.id, type, e.target.value)}
                      className="w-28 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                  ) : (
                    <div
                      onClick={() => handleCellClick(row.id, type)}
                      className="cursor-pointer select-none"
                      title="Click to edit"
                    >
                      ₹{Number(row[type]).toLocaleString()}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
