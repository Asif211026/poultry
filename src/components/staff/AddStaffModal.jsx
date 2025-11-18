import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AddStaffModal({ isOpen, onClose, onSubmit, initialData = null, mode = 'add' }) {
  const [form, setForm] = useState({
    fullName: '',
    role: 'Worker',
    phone: '',
    email: '',
    monthlySalary: 0,
    joinDate: '',
    status: 'Active',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || '',
        role: initialData.role || 'Worker',
        phone: initialData.phone || '',
        email: initialData.email || '',
        monthlySalary: typeof initialData.monthlySalary === 'number' ? initialData.monthlySalary : Number(initialData.monthlySalary) || 0,
        joinDate: initialData.joinDate || '',
        status: initialData.status || 'Active',
      })
    } else {
      setForm({ fullName: '', role: 'Worker', phone: '', email: '', monthlySalary: 0, joinDate: '', status: 'Active' })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleChange = (field, value) => setForm((s) => ({ ...s, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.fullName || !form.role || !form.phone) {
      newErrors.required = 'Please fill required fields: Full Name, Role, Phone'
    }

    const salaryVal = Number(form.monthlySalary)
    if (!Number.isFinite(salaryVal) || salaryVal <= 0) {
      newErrors.monthlySalary = 'Enter a valid salary greater than 0'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit({ ...form, monthlySalary: salaryVal, id: initialData?.id })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{mode === 'add' ? 'Add New Staff' : 'Edit Staff'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name *</label>
            <input type="text" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Role *</label>
            <select value={form.role} onChange={(e) => handleChange('role', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Worker</option>
              <option>Accountant</option>
              <option>Sales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Monthly Salary (₹) *</label>
            <input type="number" value={form.monthlySalary} onChange={(e) => handleChange('monthlySalary', e.target.value === '' ? '' : Number(e.target.value))} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
            {errors.monthlySalary && <div className="text-xs text-red-600 mt-1">{errors.monthlySalary}</div>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Join Date</label>
            <input type="date" value={form.joinDate} onChange={(e) => handleChange('joinDate', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option>Active</option>
              <option>Inactive</option>
            </select>
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
