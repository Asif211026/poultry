import { Routes, Route, Navigate } from 'react-router-dom'
import { NotificationProvider } from './contexts/NotificationContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import StockManagement from './pages/StockManagement'
import RateManagement from './pages/RateManagement'
import BillingPOS from './pages/BillingPOS'
import StaffManagement from './pages/StaffManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <NotificationProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stock" element={<StockManagement />} />
          <Route path="/rates" element={<RateManagement />} />
          <Route path="/billing" element={<BillingPOS />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* Fallback route: redirect unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </NotificationProvider>
  )
}

export default App
