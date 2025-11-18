export function getPriceForCustomerType(product, type) {
  switch (type) {
    case 'Wholesaler':
      return product.wholesalerPrice
    case 'Retailer':
      return product.retailerPrice
    case 'Restaurant':
      return product.restaurantPrice
    default:
      return product.customerPrice
  }
}

export function categoryBadgeClass(cat) {
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
