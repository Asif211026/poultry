import { createContext, useContext, useState, useEffect } from 'react'

// Create the notification context
const NotificationContext = createContext()

// NotificationProvider component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [stockData, setStockData] = useState([])
  const [pendingCredit, setPendingCredit] = useState(0)

  // Initialize with mock stock data similar to StockManagement
  useEffect(() => {
    const mockStockItems = [
      { id: 1, itemName: 'Broiler Chicken', category: 'Broiler', quantity: 45, lowStockThreshold: 100, unit: 'kg' },
      { id: 2, itemName: 'Desi Chicken', category: 'Desi', quantity: 12, lowStockThreshold: 50, unit: 'kg' },
      { id: 3, itemName: 'Leghorn Eggs', category: 'Eggs', quantity: 180, lowStockThreshold: 200, unit: 'dozen' },
      { id: 4, itemName: 'Hyderabadi Meat', category: 'Hyderabadi', quantity: 25, lowStockThreshold: 80, unit: 'kg' },
      { id: 5, itemName: 'Leghorn Chicken', category: 'Leghorn', quantity: 55, lowStockThreshold: 120, unit: 'kg' },
      { id: 6, itemName: 'Broiler Boneless', category: 'Broiler', quantity: 8, lowStockThreshold: 30, unit: 'kg' },
    ]
    setStockData(mockStockItems)
    setPendingCredit(12500) // Mock pending credit value from Dashboard
  }, [])

  // Generate notifications based on stock levels and pending credit
  useEffect(() => {
    const generatedNotifications = []
    let notificationId = 1

    // Check stock levels
    stockData.forEach((item) => {
      if (item.quantity < item.lowStockThreshold) {
        generatedNotifications.push({
          id: `stock-${item.id}`,
          type: 'stock-alert',
          title: 'Low Stock Alert',
          message: `${item.itemName} is running low (${item.quantity} ${item.unit} available)`,
          timestamp: new Date(),
          read: false,
          priority: 'high',
          itemId: item.id,
        })
        notificationId++
      }
    })

    // Check pending credit
    if (pendingCredit > 10000) {
      generatedNotifications.push({
        id: 'credit-1',
        type: 'credit-warning',
        title: 'High Pending Credit',
        message: `Pending credit has exceeded ₹10,000 (Current: ₹${pendingCredit.toLocaleString()})`,
        timestamp: new Date(),
        read: false,
        priority: 'high',
      })
    }

    setNotifications(generatedNotifications)
  }, [stockData, pendingCredit])

  // Add a notification
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  // Clear all notifications
  const clearAll = () => {
    setNotifications([])
  }

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length
  }

  // Filter notifications by type
  const getNotificationsByType = (type) => {
    return notifications.filter((n) => n.type === type)
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    getUnreadCount,
    getNotificationsByType,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

// Custom hook to use notifications
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
