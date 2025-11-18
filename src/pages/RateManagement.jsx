import { useMemo, useState } from 'react'
import TabNavigation from '../components/rates/TabNavigation'
import QuickRateEditorTable from '../components/rates/QuickRateEditorTable'
import CustomerTypeRateTable from '../components/rates/CustomerTypeRateTable'
import { Save, AlertCircle } from 'lucide-react'

const TABS = [
  { id: 'quick-editor', label: 'Quick Editor' },
  { id: 'wholesaler', label: 'Wholesalers' },
  { id: 'retailer', label: 'Retailers' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'customer', label: 'Customers' },
]

function generateMockRates() {
  const categories = ['Broiler', 'Desi', 'Eggs', 'Leghorn', 'Hyderabadi']
  const items = []
  let id = 1
  categories.forEach((cat) => {
    for (let i = 1; i <= 4; i++) {
      const base = Math.round((Math.random() * 50) + (cat === 'Eggs' ? 60 : 150))
      items.push({
        id: id++,
        category: cat,
        itemName: `${cat} Item ${i}`,
        wholesaler: Math.round(base * 0.85),
        retailer: Math.round(base * 1.0),
        restaurant: Math.round(base * 1.15),
        customer: Math.round(base * 1.25),
      })
    }
  })
  return items
}

export default function RateManagement() {
  const [rateData, setRateData] = useState(() => generateMockRates())
  const [originalRateData] = useState(rateData)
  const [activeTab, setActiveTab] = useState('quick-editor')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleRateChange = (itemId, typeOrCustomer, newPrice) => {
    setRateData((s) => s.map((r) => (r.id === itemId ? { ...r, [typeOrCustomer]: newPrice } : r)))
    setHasUnsavedChanges(true)
  }

  const handleSaveAllRates = () => {
    // Simulate API save
    console.log('Saving rates...', rateData)
    setTimeout(() => {
      setHasUnsavedChanges(false)
      // In real app, we would update originalRateData after successful save
      alert('Rates saved successfully')
    }, 700)
  }

  const handleTabChange = (tabId) => setActiveTab(tabId)

  const filteredForTab = useMemo(() => {
    if (activeTab === 'quick-editor') return rateData
    // map tab ids to object keys
    const map = { wholesaler: 'wholesaler', retailer: 'retailer', restaurant: 'restaurant', customer: 'customer' }
    const key = map[activeTab]
    return rateData.map((r) => ({ ...r }))
  }, [rateData, activeTab])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rate Management</h1>
          <p className="text-gray-600 mt-2">Edit and manage rates across customer types.</p>
        </div>

        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 bg-amber-50 border-l-4 border-amber-400 px-3 py-2 rounded">
              <AlertCircle className="text-amber-600" />
              <span className="text-amber-800 text-sm">You have unsaved changes</span>
            </div>
          )}

          <button onClick={handleSaveAllRates} disabled={!hasUnsavedChanges} className={`inline-flex items-center gap-2 px-4 py-2 rounded ${hasUnsavedChanges ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}>
            <Save />
            <span className="font-medium">Save All Rates</span>
          </button>
        </div>
      </div>

      <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'quick-editor' ? (
        <QuickRateEditorTable rateData={rateData} onRateChange={handleRateChange} hasUnsavedChanges={hasUnsavedChanges} />
      ) : (
        <CustomerTypeRateTable rateData={rateData.filter(() => true)} customerType={activeTab} onRateChange={handleRateChange} />
      )}
    </div>
  )
}
