import { User, Settings, LogOut } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDropdown({ isOpen, onClose, onLogout }) {
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleProfile = () => {
    alert('Profile section coming soon!')
    onClose()
  }

  const handleSettings = () => {
    navigate('/settings')
    onClose()
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      {/* User Info Section */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Admin User</p>
            <p className="text-sm text-gray-600">admin@agrimanager.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={handleProfile}
          className="w-full px-4 py-2 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Profile</span>
        </button>

        <button
          onClick={handleSettings}
          className="w-full px-4 py-2 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        <div className="my-2 border-t border-gray-100" />

        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
