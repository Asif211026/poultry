import { useMemo, useState } from 'react'
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react'
import TabNavigation from '../components/rates/TabNavigation'
import ReportSummaryCard from '../components/reports/ReportSummaryCard'
import ExportButtons from '../components/reports/ExportButtons'
import PeriodSalesTable from '../components/reports/DailySalesTable'
import ReportLineChart from '../components/reports/ReportLineChart'
import ReportPieChart from '../components/reports/ReportPieChart'

// Mock data generators
function generateMockDailySales(days = 30) {
  const data = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const salesAmount = Math.floor(15000 + Math.random() * 35000)
    const quantitySold = Math.floor(50 + Math.random() * 150)
    const averagePerItem = Math.floor(salesAmount / quantitySold)
    data.push({
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      dateStr: date.toISOString().slice(0, 10),
      sales: salesAmount,
      salesAmount,
      quantitySold,
      averagePerItem,
    })
  }
  return data
}

function generateMockWeeklySales(weeks = 12) {
  const data = []
  const today = new Date()
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - i * 7)
    const weekNumber = Math.ceil((today.getDate() - weekStart.getDate()) / 7) + 1
    const salesAmount = Math.floor(100000 + Math.random() * 250000)
    const quantitySold = Math.floor(400 + Math.random() * 800)
    const averagePerItem = Math.floor(salesAmount / quantitySold)
    data.push({
      date: `Week ${i + 1}`,
      sales: salesAmount,
      salesAmount,
      quantitySold,
      averagePerItem,
    })
  }
  return data
}

function generateMockMonthlySales(months = 12) {
  const data = []
  const today = new Date()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date(today)
    monthDate.setMonth(today.getMonth() - i)
    const monthLabel = monthNames[monthDate.getMonth()]
    const salesAmount = Math.floor(500000 + Math.random() * 1000000)
    const quantitySold = Math.floor(1500 + Math.random() * 3000)
    const averagePerItem = Math.floor(salesAmount / quantitySold)
    data.push({
      date: monthLabel,
      sales: salesAmount,
      salesAmount,
      quantitySold,
      averagePerItem,
    })
  }
  return data
}

function generateMockCreditReports() {
  const customers = [
    { name: 'Rajesh Kumar', totalCredit: 45000, pendingAmount: 15000, lastPaymentDate: '2025-11-15', status: 'Pending' },
    { name: 'Priya Sharma', totalCredit: 32000, pendingAmount: 0, lastPaymentDate: '2025-11-17', status: 'Paid' },
    { name: 'Vikram Singh', totalCredit: 58000, pendingAmount: 28000, lastPaymentDate: '2025-11-01', status: 'Overdue' },
    { name: 'Anita Patel', totalCredit: 28000, pendingAmount: 8000, lastPaymentDate: '2025-11-16', status: 'Pending' },
    { name: 'Suresh Nair', totalCredit: 50000, pendingAmount: 0, lastPaymentDate: '2025-11-18', status: 'Paid' },
    { name: 'Deepa Gupta', totalCredit: 35000, pendingAmount: 18000, lastPaymentDate: '2025-10-20', status: 'Overdue' },
    { name: 'Karan Desai', totalCredit: 22000, pendingAmount: 5000, lastPaymentDate: '2025-11-14', status: 'Pending' },
    { name: 'Meena Verma', totalCredit: 40000, pendingAmount: 0, lastPaymentDate: '2025-11-16', status: 'Paid' },
  ]
  return customers
}

const categoryData = [
  { name: 'Broiler', value: 44, color: '#3b82f6' },
  { name: 'Eggs', value: 23, color: '#f97316' },
  { name: 'Desi', value: 12, color: '#22c55e' },
  { name: 'Leghorn', value: 12, color: '#a855f7' },
  { name: 'Hyderabadi', value: 6, color: '#06b6d4' },
]

export default function Reports() {
  const [activeTab, setActiveTab] = useState('daily')

  const dailySalesData = useMemo(() => generateMockDailySales(30), [])
  const weeklySalesData = useMemo(() => generateMockWeeklySales(12), [])
  const monthlySalesData = useMemo(() => generateMockMonthlySales(12), [])
  const creditReportsData = useMemo(() => generateMockCreditReports(), [])

  // Calculate summary stats
  const totalSales = useMemo(() => {
    const sum = dailySalesData.reduce((acc, d) => acc + d.salesAmount, 0)
    return sum
  }, [dailySalesData])

  const dailyAverage = useMemo(() => {
    return Math.floor(totalSales / dailySalesData.length)
  }, [totalSales, dailySalesData])

  const totalItemsSold = useMemo(() => {
    return dailySalesData.reduce((acc, d) => acc + d.quantitySold, 0)
  }, [dailySalesData])

  const activeStaff = 8

  // Determine current tab's export data
  const exportData = useMemo(() => {
    if (activeTab === 'daily') return dailySalesData.map((d) => ({ Date: d.date, 'Sales Amount': `₹${Number(d.salesAmount).toLocaleString()}`, 'Quantity Sold': d.quantitySold, 'Average per Item': `₹${Number(d.averagePerItem).toLocaleString()}` }))
    if (activeTab === 'weekly') return weeklySalesData.map((w) => ({ Week: w.date, 'Sales Amount': `₹${Number(w.salesAmount).toLocaleString()}`, 'Quantity Sold': w.quantitySold, 'Average per Item': `₹${Number(w.averagePerItem).toLocaleString()}` }))
    if (activeTab === 'monthly') return monthlySalesData.map((m) => ({ Month: m.date, 'Sales Amount': `₹${Number(m.salesAmount).toLocaleString()}`, 'Quantity Sold': m.quantitySold, 'Average per Item': `₹${Number(m.averagePerItem).toLocaleString()}` }))
    if (activeTab === 'credit') return creditReportsData.map((c) => ({ Name: c.name, 'Total Credit': `₹${Number(c.totalCredit).toLocaleString()}`, 'Pending Amount': `₹${Number(c.pendingAmount).toLocaleString()}`, 'Last Payment': c.lastPaymentDate, Status: c.status }))
    return []
  }, [activeTab, dailySalesData, weeklySalesData, monthlySalesData, creditReportsData])

  const TABS = [
    { id: 'daily', label: 'Daily Reports' },
    { id: 'weekly', label: 'Weekly Reports' },
    { id: 'monthly', label: 'Monthly Reports' },
    { id: 'credit', label: 'Credit Reports' },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Comprehensive sales and business analytics</p>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          icon={TrendingUp}
          title="Total Sales"
          value={`₹${totalSales.toLocaleString()}`}
          bgColor="bg-green-100"
          iconColor="text-green-600"
          subtitle="Last 30 days"
        />
        <ReportSummaryCard
          icon={DollarSign}
          title="Daily Average"
          value={`₹${dailyAverage.toLocaleString()}`}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
          subtitle="Average per day"
        />
        <ReportSummaryCard
          icon={Package}
          title="Total Items Sold"
          value={totalItemsSold.toLocaleString()}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
          subtitle="Units sold"
        />
        <ReportSummaryCard
          icon={Users}
          title="Active Staff"
          value={activeStaff}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
          subtitle="Team members"
        />
      </div>

      {/* Export Buttons Row */}
      <div className="flex justify-end">
        <ExportButtons
          data={exportData}
          filename={`sales-report-${activeTab}`}
          reportType={activeTab}
        />
      </div>

      {/* Tabs Section */}
      <div>
        <TabNavigation
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Content Section */}
      <div>
        {/* Daily Reports Tab */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportLineChart
                data={dailySalesData}
                title="Daily Sales Trend"
                dataKey="date"
                height={300}
              />
              <ReportPieChart
                data={categoryData}
                title="Sales by Category"
                height={300}
              />
            </div>
            <PeriodSalesTable salesData={dailySalesData} periodLabel="Date" />
          </div>
        )}

        {/* Weekly Reports Tab */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportLineChart
                data={weeklySalesData}
                title="Weekly Sales Trend"
                dataKey="date"
                height={300}
              />
              <ReportPieChart
                data={categoryData}
                title="Sales by Category"
                height={300}
              />
            </div>
            <PeriodSalesTable salesData={weeklySalesData} periodLabel="Week" />
          </div>
        )}

        {/* Monthly Reports Tab */}
        {activeTab === 'monthly' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportLineChart
                data={monthlySalesData}
                title="Monthly Sales Trend"
                dataKey="date"
                height={300}
              />
              <ReportPieChart
                data={categoryData}
                title="Sales by Category"
                height={300}
              />
            </div>
            <PeriodSalesTable salesData={monthlySalesData} periodLabel="Month" />
          </div>
        )}

        {/* Credit Reports Tab */}
        {activeTab === 'credit' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Customer Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Total Credit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Pending Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Last Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {creditReportsData.map((credit, idx) => {
                  const statusColor = credit.status === 'Paid' ? 'bg-green-100 text-green-800' : credit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{credit.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{Number(credit.totalCredit).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{Number(credit.pendingAmount).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{credit.lastPaymentDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>{credit.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
