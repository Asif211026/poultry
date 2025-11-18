import { useMemo, useState } from 'react'
import { Beef, Bird, Egg, Drumstick, Flame } from 'lucide-react'
import CategoryCard from '../components/stock/CategoryCard'
import SearchFilterBar from '../components/stock/SearchFilterBar'
import StockTable from '../components/stock/StockTable'
import AddStockModal from '../components/stock/AddStockModal'

const CATEGORIES = ['Broiler', 'Desi', 'Leghorn', 'Hyderabadi', 'Eggs']

function generateMockItems() {
  return [
    { id: 1, itemName: 'Broiler Whole', category: 'Broiler', quantity: 120, unit: 'kg', costPrice: 80, sellingPrice: 120, lowStockThreshold: 20, expiryDate: '', status: 'In Stock' },
    { id: 2, itemName: 'Desi Chicken', category: 'Desi', quantity: 45, unit: 'kg', costPrice: 140, sellingPrice: 200, lowStockThreshold: 10, expiryDate: '', status: 'In Stock' },
    { id: 3, itemName: 'Leghorn Eggs', category: 'Eggs', quantity: 30, unit: 'dozen', costPrice: 30, sellingPrice: 50, lowStockThreshold: 20, expiryDate: '', status: 'Low Stock' },
    { id: 4, itemName: 'Hyderabadi Bird', category: 'Hyderabadi', quantity: 8, unit: 'pieces', costPrice: 200, sellingPrice: 300, lowStockThreshold: 10, expiryDate: '', status: 'Low Stock' },
    { id: 5, itemName: 'Boneless Broiler', category: 'Broiler', quantity: 15, unit: 'kg', costPrice: 220, sellingPrice: 320, lowStockThreshold: 10, expiryDate: '', status: 'Low Stock' },
    { id: 6, itemName: 'Egg Carton', category: 'Eggs', quantity: 70, unit: 'dozen', costPrice: 20, sellingPrice: 35, lowStockThreshold: 15, expiryDate: '', status: 'In Stock' },
    { id: 7, itemName: 'Desi Eggs', category: 'Eggs', quantity: 12, unit: 'dozen', costPrice: 35, sellingPrice: 60, lowStockThreshold: 20, expiryDate: '', status: 'Low Stock' },
    { id: 8, itemName: 'Leghorn Young', category: 'Leghorn', quantity: 50, unit: 'pieces', costPrice: 90, sellingPrice: 140, lowStockThreshold: 10, expiryDate: '', status: 'In Stock' },
    { id: 9, itemName: 'Hyderabadi Super', category: 'Hyderabadi', quantity: 3, unit: 'pieces', costPrice: 300, sellingPrice: 450, lowStockThreshold: 5, expiryDate: '', status: 'Low Stock' },
    { id: 10, itemName: 'Broiler Breast', category: 'Broiler', quantity: 200, unit: 'kg', costPrice: 150, sellingPrice: 220, lowStockThreshold: 30, expiryDate: '', status: 'In Stock' },
  ]
}

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [editingItem, setEditingItem] = useState(null)
  const [stockItems, setStockItems] = useState(() => generateMockItems())

  // Derived filtered items
  const filteredItems = useMemo(() => {
    return stockItems.filter((item) => {
      const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [stockItems, searchTerm, selectedCategory])

  // Aggregated stats per category
  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const items = stockItems.filter((i) => i.category === cat)
      const totalQty = items.reduce((s, it) => s + (it.unit === 'kg' || it.unit === 'pieces' || it.unit === 'dozen' ? Number(it.quantity) : 0), 0)
      const totalValue = items.reduce((s, it) => s + (it.sellingPrice * it.quantity), 0)
      return { category: cat, totalQty, totalValue }
    })
  }, [stockItems])

  const openAddModal = () => {
    setModalMode('add')
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item) => {
    setModalMode('edit')
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this item?')) return
    setStockItems((s) => s.filter((it) => it.id !== id))
  }

  const handleModalSubmit = (data) => {
    if (modalMode === 'add') {
      const newItem = {
        ...data,
        id: Date.now(),
        status: data.quantity <= data.lowStockThreshold ? 'Low Stock' : 'In Stock',
      }
      setStockItems((s) => [newItem, ...s])
    } else {
      setStockItems((s) => s.map((it) => (it.id === data.id ? { ...it, ...data, status: data.quantity <= data.lowStockThreshold ? 'Low Stock' : 'In Stock' } : it)))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
        <p className="text-gray-600 mt-2">Manage inventory across categories and add new stock items.</p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categoryStats.map((c) => {
          const Icon = c.category === 'Broiler' ? Beef : c.category === 'Desi' ? Bird : c.category === 'Leghorn' ? Drumstick : c.category === 'Hyderabadi' ? Flame : Egg
          return (
            <CategoryCard key={c.category} category={c.category} icon={Icon} totalStock={c.totalQty} unit={c.category === 'Eggs' ? 'dozen' : 'kg'} value={Math.round(c.totalValue)} bgColor="bg-blue-50" iconColor="text-blue-600" />
          )
        })}
      </div>

      {/* Search / Filter Bar */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={CATEGORIES}
        onAdd={openAddModal}
      />

      {/* Stock Table */}
      <StockTable stockItems={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add / Edit Modal */}
      <AddStockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} initialData={editingItem} mode={modalMode} />
    </div>
  )
}
