export default function PayrollTable({ payrollData = [] }) {
  const totals = payrollData.reduce((acc, p) => {
    acc.base += p.baseSalary
    acc.total += p.totalSalary
    return acc
  }, { base: 0, total: 0 })

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Employee</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Base Salary</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Working Days</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Overtime Hours</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Total Salary</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {payrollData.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">No payroll data available.</td>
            </tr>
          )}

          {payrollData.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{p.fullName}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{p.role}</td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{p.baseSalary.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-700 text-right">{p.workingDays}</td>
              <td className="px-4 py-3 text-sm text-gray-700 text-right">{p.overtimeHours}</td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">₹{p.totalSalary.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="px-4 py-3 text-sm font-medium">Totals</td>
            <td></td>
            <td className="px-4 py-3 text-sm font-medium text-right">₹{totals.base.toLocaleString()}</td>
            <td></td>
            <td></td>
            <td className="px-4 py-3 text-sm font-medium text-right">₹{totals.total.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
          </tr>
        </tfoot>
      </table>
      </div>
    </div>
  )
}
