export default function CustomerInfoForm({ customerName, customerType, onCustomerNameChange, onCustomerTypeChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name (Optional)</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Enter customer name"
          className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
        <select
          value={customerType}
          onChange={(e) => onCustomerTypeChange(e.target.value)}
          className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option>Customer</option>
          <option>Wholesaler</option>
          <option>Retailer</option>
          <option>Restaurant</option>
        </select>
      </div>
    </div>
  )
}
