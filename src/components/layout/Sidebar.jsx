import { NavLink } from 'react-router-dom'
import {
  Leaf,
  LayoutDashboard,
  Package,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  Settings as SettingsIcon,
  X,
} from 'lucide-react'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/stock', label: 'Stock Management', icon: Package },
    { path: '/rates', label: 'Rate Management', icon: TrendingUp },
    { path: '/billing', label: 'Billing & POS', icon: ShoppingCart },
    { path: '/staff', label: 'Staff Management', icon: Users },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-primary-700 text-white flex flex-col transition-transform duration-300 z-50 md:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-primary-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf size={32} className="text-primary-300" />
            <div>
              <h1 className="text-xl font-bold">AgriManager</h1>
              <p className="text-xs text-primary-300">Poultry Management</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar navigation"
            className="md:hidden hover:bg-primary-600 p-1 rounded transition-smooth"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                  }`
                }
                onClick={() => {
                  // Close sidebar on mobile when navigating
                  if (window.innerWidth < 768) {
                    toggleSidebar()
                  }
                }}
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-primary-600 text-center text-xs text-primary-300">
          <p>Version 1.0.0</p>
        </div>
      </aside>
    </>
  )
}
