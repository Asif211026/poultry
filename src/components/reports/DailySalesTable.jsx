export default function PeriodSalesTable({ salesData = [], loading = false, periodLabel = 'Date' }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">{periodLabel}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Sales Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Quantity Sold</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Average per Item</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {loading && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          )}

          {!loading && salesData.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No sales data available.
              </td>
            </tr>
          )}

          {!loading &&
            salesData.map((sale, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{sale.date}</td>
                <td className="px-4 py-3 text-sm text-gray-900">₹{Number(sale.salesAmount).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{sale.quantitySold}</td>
                <td className="px-4 py-3 text-sm text-gray-900">₹{Number(sale.averagePerItem).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
