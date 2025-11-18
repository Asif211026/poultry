// Format timestamp to relative time (e.g., "2 minutes ago")
export function formatTimestamp(timestamp) {
  const now = new Date()
  const diff = now - new Date(timestamp)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

// Generate stock alert notification
export function generateStockAlertNotification(item) {
  return {
    id: `stock-${item.id}`,
    type: 'stock-alert',
    title: 'Low Stock Alert',
    message: `${item.itemName} is running low (${item.quantity} ${item.unit} available)`,
    timestamp: new Date(),
    read: false,
    priority: 'high',
    itemId: item.id,
  }
}

// Generate credit warning notification
export function generateCreditWarningNotification(amount, threshold) {
  return {
    id: 'credit-' + Date.now(),
    type: 'credit-warning',
    title: 'High Pending Credit',
    message: `Pending credit has exceeded ₹${threshold.toLocaleString()} (Current: ₹${amount.toLocaleString()})`,
    timestamp: new Date(),
    read: false,
    priority: 'high',
  }
}

// Sort notifications by priority then timestamp
export function sortNotificationsByPriority(notifications) {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return [...notifications].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return new Date(b.timestamp) - new Date(a.timestamp)
  })
}

// Get notification icon (returns icon name, actual icon rendered in component)
export function getNotificationIcon(type) {
  switch (type) {
    case 'stock-alert':
      return 'AlertTriangle'
    case 'credit-warning':
      return 'CreditCard'
    default:
      return 'AlertTriangle'
  }
}

// Get notification color
export function getNotificationColor(type) {
  switch (type) {
    case 'stock-alert':
      return 'text-amber-600'
    case 'credit-warning':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}
