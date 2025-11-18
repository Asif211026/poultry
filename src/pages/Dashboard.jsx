import { Package, DollarSign, CreditCard, Users } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import LowStockAlert from '../components/dashboard/LowStockAlert'
import LowStockItem from '../components/dashboard/LowStockItem'
import DailySalesTrendChart from '../components/dashboard/DailySalesTrendChart'
import SalesByCategoryChart from '../components/dashboard/SalesByCategoryChart'

export default function Dashboard() {
  const lowStockItems = [
    {
      itemName: 'Broiler Meat',
      category: 'Broiler',
      currentStock: 5,
      threshold: 20,
      unit: 'kg',
    },
    {
      itemName: 'Desi Chicken',
      category: 'Desi',
      currentStock: 8,
      threshold: 25,
      unit: 'kg',
    },
    {
      itemName: 'Leghorn Eggs',
      category: 'Eggs',
      currentStock: 12,
      threshold: 50,
      unit: 'dozen',
    },
    {
      itemName: 'Hyderabadi Birds',
      category: 'Hyderabadi',
      currentStock: 3,
      threshold: 15,
      unit: 'pieces',
    },
    {
      itemName: 'Broiler Boneless',
      category: 'Broiler',
      currentStock: 6,
      threshold: 18,
      unit: 'kg',
    },
    {
      itemName: 'Desi Eggs',
      category: 'Eggs',
      currentStock: 15,
      threshold: 40,
      unit: 'dozen',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Low Stock Alert Banner */}
      <LowStockAlert itemCount={3} />

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Current Stock"
          value="1,245 kg"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={DollarSign}
          title="Today's Sales"
          value="₹45,230"
          bgColor="bg-green-100"
          iconColor="text-green-600"
          trend="+12%"
        />
        <StatCard
          icon={CreditCard}
          title="Pending Credit"
          value="₹12,500"
          bgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={Users}
          title="Staff Present"
          value="8/10"
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailySalesTrendChart />
        <SalesByCategoryChart />
      </div>

      {/* Low Stock Items Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Low Stock Items</h3>
          <a
            href="#"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lowStockItems.map((item, index) => (
            <LowStockItem
              key={index}
              itemName={item.itemName}
              category={item.category}
              currentStock={item.currentStock}
              threshold={item.threshold}
              unit={item.unit}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
