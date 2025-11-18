import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AddStockModal({ isOpen, onClose, onSubmit, initialData = null, mode = 'add' }) {
  const [form, setForm] = useState({
    itemName: '',
    category: 'Broiler',
    quantity: 0,
    unit: 'kg',
    costPrice: 0,
    sellingPrice: 0,
    lowStockThreshold: 0,
    expiryDate: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        itemName: initialData.itemName || '',
        category: initialData.category || 'Broiler',
        quantity: initialData.quantity || 0,
        unit: initialData.unit || 'kg',
        costPrice: initialData.costPrice || 0,
        sellingPrice: initialData.sellingPrice || 0,
        lowStockThreshold: initialData.lowStockThreshold || 0,
        expiryDate: initialData.expiryDate ? initialData.expiryDate.split('T')[0] : '',
      })
    } else {
      setForm({
        itemName: '',
        category: 'Broiler',
        quantity: 0,
        unit: 'kg',
        costPrice: 0,
        sellingPrice: 0,
        lowStockThreshold: 0,
        expiryDate: '',
      })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleChange = (field, value) => setForm((s) => ({ ...s, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!form.itemName || form.quantity <= 0 || form.costPrice <= 0 || form.sellingPrice <= 0) {
      alert('Please fill required fields: Item Name, Quantity, Cost Price, Selling Price')
      return
    }

    onSubmit({ ...form, id: initialData?.id })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{mode === 'add' ? 'Add New Stock' : 'Edit Stock'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Item Name *</label>
            <input type="text" value={form.itemName} onChange={(e) => handleChange('itemName', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Category *</label>
            <select value={form.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option>Broiler</option>
              <option>Desi</option>
              <option>Leghorn</option>
              <option>Hyderabadi</option>
              <option>Eggs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Quantity *</label>
            <input type="number" value={form.quantity} onChange={(e) => handleChange('quantity', Number(e.target.value))} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Unit *</label>
            <select value={form.unit} onChange={(e) => handleChange('unit', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option>kg</option>
              <option>pieces</option>
              <option>dozen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Cost Price (₹) *</label>
            <input type="number" value={form.costPrice} onChange={(e) => handleChange('costPrice', Number(e.target.value))} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Selling Price (₹) *</label>
            <input type="number" value={form.sellingPrice} onChange={(e) => handleChange('sellingPrice', Number(e.target.value))} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Low Stock Threshold *</label>
            <input type="number" value={form.lowStockThreshold} onChange={(e) => handleChange('lowStockThreshold', Number(e.target.value))} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
            <input type="date" value={form.expiryDate} onChange={(e) => handleChange('expiryDate', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700">{mode === 'add' ? 'Save' : 'Update'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
