import { Search } from 'lucide-react'

export default function ProductSearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>
    </div>
  )
}
