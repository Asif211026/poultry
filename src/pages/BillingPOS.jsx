import { useMemo, useState } from 'react'
import ProductSearchBar from '../components/pos/ProductSearchBar'
import ProductCard from '../components/pos/ProductCard'
import CustomerInfoForm from '../components/pos/CustomerInfoForm'
import CartSidebar from '../components/pos/CartSidebar'
import { getPriceForCustomerType } from '../utils/posUtils'

const CATEGORIES = ['Broiler', 'Desi', 'Leghorn', 'Hyderabadi', 'Eggs']

function generateMockProducts() {
  return [
    { id: 1, name: 'Broiler Whole', category: 'Broiler', wholesalerPrice: 150, retailerPrice: 180, restaurantPrice: 200, customerPrice: 220, basePrice: 180, availableQuantity: 120, unit: 'kg' },
    { id: 2, name: 'Broiler Breast', category: 'Broiler', wholesalerPrice: 140, retailerPrice: 170, restaurantPrice: 190, customerPrice: 210, basePrice: 170, availableQuantity: 80, unit: 'kg' },
    { id: 3, name: 'Broiler Legs', category: 'Broiler', wholesalerPrice: 120, retailerPrice: 150, restaurantPrice: 170, customerPrice: 190, basePrice: 150, availableQuantity: 60, unit: 'kg' },
    { id: 4, name: 'Desi Chicken', category: 'Desi', wholesalerPrice: 160, retailerPrice: 200, restaurantPrice: 230, customerPrice: 260, basePrice: 200, availableQuantity: 40, unit: 'kg' },
    { id: 5, name: 'Desi Eggs', category: 'Eggs', wholesalerPrice: 35, retailerPrice: 50, restaurantPrice: 60, customerPrice: 75, basePrice: 50, availableQuantity: 50, unit: 'dozen' },
    { id: 6, name: 'Leghorn Eggs', category: 'Leghorn', wholesalerPrice: 30, retailerPrice: 45, restaurantPrice: 55, customerPrice: 70, basePrice: 45, availableQuantity: 70, unit: 'dozen' },
    { id: 7, name: 'Leghorn Young', category: 'Leghorn', wholesalerPrice: 90, retailerPrice: 120, restaurantPrice: 150, customerPrice: 180, basePrice: 120, availableQuantity: 30, unit: 'pieces' },
    { id: 8, name: 'Hyderabadi Bird', category: 'Hyderabadi', wholesalerPrice: 190, retailerPrice: 230, restaurantPrice: 270, customerPrice: 320, basePrice: 230, availableQuantity: 15, unit: 'pieces' },
    { id: 9, name: 'Hyderabadi Super', category: 'Hyderabadi', wholesalerPrice: 210, retailerPrice: 250, restaurantPrice: 300, customerPrice: 350, basePrice: 250, availableQuantity: 10, unit: 'pieces' },
    { id: 10, name: 'Egg Carton', category: 'Eggs', wholesalerPrice: 25, retailerPrice: 40, restaurantPrice: 50, customerPrice: 65, basePrice: 40, availableQuantity: 90, unit: 'dozen' },
    { id: 11, name: 'Boneless Broiler', category: 'Broiler', wholesalerPrice: 200, retailerPrice: 250, restaurantPrice: 300, customerPrice: 350, basePrice: 250, availableQuantity: 25, unit: 'kg' },
    { id: 12, name: 'Broiler Wings', category: 'Broiler', wholesalerPrice: 110, retailerPrice: 140, restaurantPrice: 160, customerPrice: 190, basePrice: 140, availableQuantity: 40, unit: 'kg' },
    { id: 13, name: 'Desi Thigh', category: 'Desi', wholesalerPrice: 170, retailerPrice: 210, restaurantPrice: 250, customerPrice: 290, basePrice: 210, availableQuantity: 20, unit: 'kg' },
    { id: 14, name: 'Leghorn Eggs Premium', category: 'Leghorn', wholesalerPrice: 35, retailerPrice: 55, restaurantPrice: 70, customerPrice: 90, basePrice: 55, availableQuantity: 35, unit: 'dozen' },
    { id: 15, name: 'Desi Breast', category: 'Desi', wholesalerPrice: 150, retailerPrice: 190, restaurantPrice: 220, customerPrice: 260, basePrice: 190, availableQuantity: 28, unit: 'kg' },
  ]
}

export default function BillingPOS() {
  const products = useMemo(() => generateMockProducts(), [])

  const [searchTerm, setSearchTerm] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerType, setCustomerType] = useState('Customer')
  const [cartItems, setCartItems] = useState([])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [products, searchTerm])

  // use shared helper
  // const getPriceForCustomerType = (product, type) => { ... }

  const handleAddToCart = (product) => {
    // Respect availableQuantity: block add if none available
    if (!product.availableQuantity || product.availableQuantity <= 0) {
      alert(`${product.name} is out of stock`)
      return
    }

    const price = getPriceForCustomerType(product, customerType)
    setCartItems((s) => {
      const exists = s.find((it) => it.id === product.id)
      if (exists) {
        return s.map((it) => it.id === product.id ? { ...it, quantity: Math.min(it.quantity + 1, product.availableQuantity) } : it)
      }
      return [{ id: product.id, name: product.name, category: product.category, price, quantity: 1, unit: product.unit, availableQuantity: product.availableQuantity }, ...s]
    })
  }

  const handleUpdateQuantity = (id, newQty) => {
    setCartItems((s) => s.map((it) => it.id === id ? { ...it, quantity: Math.max(1, Math.min(newQty, it.availableQuantity)) } : it))
  }

  const handleRemoveItem = (id) => setCartItems((s) => s.filter((it) => it.id !== id))

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty')
      return
    }
    const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0)
    const gst = subtotal * 0.18
    const total = subtotal + gst
    const summary = `Order Summary:\nCustomer: ${customerName || 'Walk-in'} (${customerType})\nItems: ${cartItems.length}\nTotal: ₹${total.toLocaleString(undefined, {maximumFractionDigits:2})}`
    alert(summary)
    setCartItems([])
    setCustomerName('')
    setCustomerType('Customer')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & POS</h1>
        <p className="text-gray-600 mt-2">Create invoices and manage quick sales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - product list (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <ProductSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 p-6 bg-white rounded-lg shadow">No products found.</div>
            )}

            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} customerType={customerType} />
            ))}
          </div>
        </div>

        {/* Right - customer form + cart (1/3) */}
        <div className="space-y-4">
          <CustomerInfoForm
            customerName={customerName}
            customerType={customerType}
            onCustomerNameChange={setCustomerName}
            onCustomerTypeChange={(type) => {
              // when customer type changes, update prices in cart to match new type
              setCustomerType(type)
              setCartItems((s) => s.map((it) => {
                // find product base by matching id in generated products
                const prod = products.find((p) => p.id === it.id)
                if (!prod) return it
                const newPrice = getPriceForCustomerType(prod, type)
                return { ...it, price: newPrice }
              }))
            }}
          />

          <CartSidebar cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  )
}
