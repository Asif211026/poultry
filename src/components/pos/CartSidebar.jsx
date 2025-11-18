import { Plus, Minus, Trash2 } from 'lucide-react'
import { categoryBadgeClass } from '../../utils/posUtils'

export default function CartSidebar({ cartItems = [], onUpdateQuantity = () => {}, onRemoveItem = () => {}, onCheckout = () => {} }) {
  const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0)
  const gst = subtotal * 0.18
  const total = subtotal + gst

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Cart</h3>
        <span className="text-sm text-gray-600">{cartItems.length} items</span>
      </div>

      <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto mb-4">
        {cartItems.length === 0 && (
          <div className="p-4 text-gray-500 text-sm">Your cart is empty.</div>
        )}

        {cartItems.map((it) => (
          <div key={it.id} className="py-3 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{it.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className={categoryBadgeClass(it.category)}>{it.category}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold">₹{(it.price * it.quantity).toLocaleString()}</div>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <div className="text-sm text-gray-700">₹{it.price.toLocaleString()} x {it.quantity}</div>

                <button
                  onClick={() => onUpdateQuantity(it.id, Math.max(1, it.quantity - 1))}
                  className="w-8 h-8 inline-flex items-center justify-center border rounded-full text-gray-600 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>

                <div className="px-3 py-1 border rounded text-sm">{it.quantity}</div>

                <button
                  onClick={() => onUpdateQuantity(it.id, it.quantity + 1)}
                  className="w-8 h-8 inline-flex items-center justify-center border rounded-full text-gray-600 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>

                <button onClick={() => onRemoveItem(it.id)} className="ml-auto text-red-600 hover:text-red-700">
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>GST (18%)</span>
          <span>₹{gst.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900 mt-2 mb-4">
          <span>Total</span>
          <span>₹{total.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
        </div>

        <button
          onClick={() => onCheckout()}
          disabled={cartItems.length === 0}
          className={`w-full py-3 rounded-lg text-white ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
