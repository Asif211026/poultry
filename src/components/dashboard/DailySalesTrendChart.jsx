import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const mockData = [
  { date: 'Nov 08', sales: 28400 },
  { date: 'Nov 09', sales: 32100 },
  { date: 'Nov 10', sales: 25300 },
  { date: 'Nov 11', sales: 38900 },
  { date: 'Nov 12', sales: 42300 },
  { date: 'Nov 13', sales: 35600 },
  { date: 'Nov 14', sales: 45230 },
  { date: 'Nov 15', sales: 38500 },
]

export default function DailySalesTrendChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Sales Trend</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ fill: '#16a34a', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            name="Daily Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
