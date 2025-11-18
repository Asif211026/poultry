import { Plus } from 'lucide-react'
import { getPriceForCustomerType, categoryBadgeClass } from '../../utils/posUtils'

export default function ProductCard({ product, onAddToCart, customerType = 'Customer' }) {
  const price = getPriceForCustomerType(product, customerType)

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-md font-semibold text-gray-900">{product.name}</h4>
          <span className={categoryBadgeClass(product.category)}>{product.category}</span>
        </div>

        <p className="text-sm text-gray-700">Price: <span className="font-medium">₹{Number(price).toLocaleString()}</span></p>
        <p className="text-xs text-gray-500 mt-1">Available: {product.availableQuantity} {product.unit}</p>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg w-full"
      >
        <Plus size={16} />
        <span className="font-medium">Add to Cart</span>
      </button>
    </div>
  )
}
