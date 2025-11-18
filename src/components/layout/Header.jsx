import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Bell, User } from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationContext'
import NotificationDropdown from './NotificationDropdown'
import UserDropdown from './UserDropdown'

export default function Header({ toggleSidebar }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { notifications, markAsRead, markAllAsRead, clearAll, getUnreadCount } = useNotifications()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const notificationButtonRef = useRef(null)
  const userButtonRef = useRef(null)

  // Map routes to page titles
  const pageTitle = {
    '/': 'Dashboard',
    '/stock': 'Stock Management',
    '/rates': 'Rate Management',
    '/billing': 'Billing & POS',
    '/staff': 'Staff Management',
    '/reports': 'Reports',
    '/settings': 'Settings',
  }[location.pathname] || 'Dashboard'

  const unreadCount = getUnreadCount()

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen)
    setUserMenuOpen(false)
  }

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen)
    setNotificationOpen(false)
  }

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (confirmed) {
      // Clear any local storage/session data (placeholder for future auth)
      localStorage.clear()
      sessionStorage.clear()
      
      // Redirect to dashboard
      navigate('/')
      
      // Close menu and show success message
      setUserMenuOpen(false)
      alert('Logged out successfully')
    }
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left Section: Menu button and Page Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900">{pageTitle}</h2>
        </div>

        {/* Right Section: Notification and User icons */}
        <div className="flex items-center gap-6 relative">
          {/* Notification Bell */}
          <div className="relative">
            <button
              ref={notificationButtonRef}
              onClick={handleNotificationClick}
              aria-label="View notifications"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-smooth group"
            >
              <Bell size={24} className="text-gray-600 group-hover:text-gray-900" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onClearAll={clearAll}
            />
          </div>

          {/* User Profile Icon */}
          <div className="relative">
            <button
              ref={userButtonRef}
              onClick={handleUserMenuClick}
              aria-label="User profile menu"
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth group"
            >
              <User size={24} className="text-gray-600 group-hover:text-gray-900" />
            </button>
            <UserDropdown
              isOpen={userMenuOpen}
              onClose={() => setUserMenuOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
