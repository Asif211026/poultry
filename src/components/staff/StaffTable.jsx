import { Edit2, Trash2 } from 'lucide-react'

function StatusBadge({ status }) {
  if (status === 'Active') return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
  return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Inactive</span>
}

export default function StaffTable({ staffList = [], onEdit = () => {}, onDelete = () => {} }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Contact</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Salary</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Join Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {staffList.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-500">No staff members found.</td>
            </tr>
          )}

          {staffList.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{s.fullName}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.role}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.phone} <br /> <span className="text-xs text-gray-500">{s.email}</span></td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{Number(s.monthlySalary).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.joinDate}</td>
              <td className="px-4 py-3 text-sm text-gray-700"><StatusBadge status={s.status} /></td>
              <td className="px-4 py-3 text-right text-sm">
                <button onClick={() => onEdit(s)} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mr-2">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(s.id)} className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
