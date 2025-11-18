export default function TabNavigation({ tabs = [], activeTab, onTabChange }) {
  return (
    <div className="bg-white shadow rounded mb-4">
      <div className="flex overflow-x-auto whitespace-nowrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-6 py-3 focus:outline-none transition-colors duration-200 ${
              activeTab === t.id
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
