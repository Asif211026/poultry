# Poultry Management System (AgriManager)

A professional, modern web application for managing poultry farms efficiently. AgriManager provides comprehensive tools for inventory management, rate tracking, billing, staff coordination, and detailed analytics.

## Features

- **Dashboard**: Real-time overview of stock levels, sales metrics, and alerts with visual charts
- **Stock Management**: Track inventory across five product categories with search, filtering, and category aggregation
- **Rate Management**: Manage customer-type pricing (Wholesaler, Retailer, Restaurant, Customer) with quick editing and save-all functionality
- **Billing & POS**: Complete point-of-sale system with dynamic pricing, shopping cart, GST calculation, and checkout
- **Staff Management**: Employee management with three tabs: Staff List, Attendance Tracking, and Payroll Summary
- **Reports & Analytics**: Comprehensive reporting with daily/weekly/monthly views, charts, export to CSV/PDF, and credit reports
- **Notifications**: Real-time notifications for stock alerts and pending credit warnings with dropdown interface
- **User Menu**: User profile dropdown with settings access and logout functionality
- **Settings**: System configuration and user preferences (placeholder for future development)

## Technology Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.0
- **Routing**: React Router DOM 6.26.0
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React 0.400.0
- **CSS Processing**: PostCSS with Autoprefixer

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd Paultry
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Create a production build in the `dist` directory
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── MainLayout.jsx          # Main layout wrapper with Sidebar/Header/Outlet
│   │   ├── Sidebar.jsx             # Navigation sidebar with mobile toggle
│   │   ├── Header.jsx              # Top header with page title and user controls
│   │   ├── NotificationDropdown.jsx # Notification dropdown component
│   │   └── UserDropdown.jsx        # User profile dropdown component
│   ├── dashboard/
│   │   ├── StatCard.jsx            # Metric display card
│   │   ├── LowStockAlert.jsx       # Low stock alerts section
│   │   ├── LowStockItem.jsx        # Individual low stock item display
│   │   ├── DailySalesTrendChart.jsx # Recharts line chart for sales trends
│   │   └── SalesByCategoryChart.jsx # Recharts pie chart for category breakdown
│   ├── stock/
│   │   ├── CategoryCard.jsx        # Category summary card
│   │   ├── SearchFilterBar.jsx     # Search and category filter
│   │   ├── StockTable.jsx          # Inventory table
│   │   └── AddStockModal.jsx       # Add/edit stock item modal
│   ├── rates/
│   │   ├── TabNavigation.jsx       # Tab switcher component
│   │   ├── QuickRateEditorTable.jsx # Inline rate editor
│   │   └── CustomerTypeRateTable.jsx # Customer type rate table
│   ├── pos/
│   │   ├── ProductSearchBar.jsx    # Product search input
│   │   ├── ProductCard.jsx         # Product grid card
│   │   ├── CustomerInfoForm.jsx    # Customer type selector
│   │   └── CartSidebar.jsx         # Shopping cart with GST
│   ├── staff/
│   │   ├── StaffTable.jsx          # Staff list table
│   │   ├── AddStaffModal.jsx       # Add/edit staff modal
│   │   ├── AttendanceView.jsx      # Attendance marking interface
│   │   └── PayrollTable.jsx        # Payroll summary table
│   └── reports/
│       ├── ReportSummaryCard.jsx   # Metric card for reports
│       ├── ExportButtons.jsx       # CSV/PDF export buttons
│       ├── DailySalesTable.jsx     # Period sales table (reusable)
│       ├── ReportLineChart.jsx     # Reusable line chart
│       └── ReportPieChart.jsx      # Reusable pie chart
├── pages/
│   ├── Dashboard.jsx               # Dashboard page
│   ├── StockManagement.jsx         # Stock management page
│   ├── RateManagement.jsx          # Rate management page
│   ├── BillingPOS.jsx              # Billing & POS page
│   ├── StaffManagement.jsx         # Staff management page
│   ├── Reports.jsx                 # Reports & analytics page
│   └── Settings.jsx                # Settings page (placeholder)
├── contexts/
│   └── NotificationContext.jsx     # Global notification state management
├── utils/
│   ├── posUtils.js                 # POS utility functions (pricing, category badge)
│   └── notificationHelpers.js      # Notification utility functions
├── App.jsx                         # Main app component with routing
├── main.jsx                        # Application entry point
└── index.css                       # Global styles and Tailwind directives

public/                             # Static files served directly
```

## Design Patterns & Architecture

### Component Organization
- **Feature-based structure**: Components are organized by feature (dashboard, stock, rates, pos, staff, reports) rather than type
- **Reusable components**: Generic components like charts and tables are designed for reuse across multiple pages
- **Layout separation**: MainLayout wraps all page routes with Sidebar and Header

### State Management
- **React Hooks**: Uses `useState` for local component state and `useMemo` for derived state and memoization
- **Mock data generators**: Functional data generators for demo purposes, easily replaceable with API calls
- **Lazy initialization**: State initialized with functions to generate data only when component mounts

### Responsive Design
- **Mobile-first approach**: Base styles mobile, then add tablet/desktop enhancements
- **Tailwind breakpoints**: md: (768px) for tablets, lg: (1024px) for desktops
- **Touch-friendly**: Adequate button sizes and spacing for touch interfaces

### Color & Styling
- **Primary color**: Green (#16a34a) for primary actions and highlights
- **Tailwind utilities**: Uses Tailwind CSS utility classes for consistent styling
- **Custom scrollbar**: Defined in index.css for better aesthetic
- **Transition utility**: Custom `transition-smooth` class for all interactive elements

### Notification System

The application uses React Context API for global notification management. Notifications are automatically generated based on:

- **Stock Alerts**: Triggered when inventory falls below defined thresholds
- **Credit Warnings**: Triggered when pending credit exceeds ₹10,000

#### Key Components:
- **NotificationContext** (`src/contexts/NotificationContext.jsx`): Manages global notification state
- **NotificationDropdown** (`src/components/layout/NotificationDropdown.jsx`): Displays notifications with read/unread status
- **UserDropdown** (`src/components/layout/UserDropdown.jsx`): User menu with logout functionality
- **notificationHelpers.js** (`src/utils/notificationHelpers.js`): Utility functions for formatting and generating notifications

#### Features:
- Real-time stock and credit alerts
- Unread notification count badge on bell icon
- Mark notifications as read individually or all at once
- Clear all notifications functionality
- Click-outside detection for dropdown closure
- Relative time formatting (e.g., "2 hours ago")

#### Future Integration:
To connect with a backend API:
1. Replace mock stock data in `NotificationContext.jsx` with API calls
2. Update the `useEffect` hook to fetch data from your backend
3. Extend notification types and priorities as needed
4. Implement real-time updates using WebSockets or polling

## Key Features by Page

### Dashboard
- 5 summary stat cards with icon badges
- Low stock alerts with category-colored badges
- Sales trend line chart (last 30 days)
- Sales by category pie chart (5 categories only)

### Stock Management
- Search and filter by category
- Category summary cards showing total quantity and value
- Responsive stock table with add/edit/delete modal
- Mock data with 10 items across 5 categories

### Rate Management
- 2 tabs: Quick Rate Editor and Per-Customer-Type Rates
- Inline editing with change tracking
- Save All button to persist changes
- 4 customer types: Wholesaler, Retailer, Restaurant, Customer

### Billing & POS
- Real-time product search
- Dynamic pricing based on customer type
- Shopping cart with quantity controls
- GST calculation (18%) and total display
- Checkout button with empty cart validation

### Staff Management
- 3 tabs: Staff List, Attendance, Payroll
- Add/Edit staff modal with validation
- Date-based attendance marking (Present/Absent)
- Payroll calculated from attendance data (working days × per-day rate)

### Reports & Analytics
- 4 report tabs: Daily, Weekly, Monthly, Credit
- Responsive charts (line and pie) using Recharts
- CSV and PDF export functionality
- Credit reports with status badges (Paid, Pending, Overdue)

### User Menu & Logout
- User profile dropdown accessible from top-right header button
- Quick access to Profile, Settings, and Logout options
- Logout requires confirmation and clears session state
- After logout, user is redirected to dashboard
- Current implementation is a placeholder for backend authentication integration

## Testing & Validation

### Responsive Design
- Test on mobile (320px), tablet (768px), and desktop (1024px+)
- Sidebar collapses on mobile with overlay
- Charts stack vertically on mobile, side-by-side on desktop

### Category Consistency
- All pages use 5 standard categories: Broiler, Desi, Leghorn, Hyderabadi, Eggs
- Boneless items are categorized under Broiler
- Feed category is excluded throughout

### Data Validation
- Stock quantities must be positive numbers
- Salary inputs require valid positive amounts
- Search filters work across all text fields
- Date inputs use browser native date picker

## Dependencies & Libraries

| Package | Version | Purpose |
|---------|---------|----------|
| react | 18.3.1 | UI framework |
| react-dom | 18.3.1 | React rendering |
| react-router-dom | 6.26.0 | Client-side routing |
| vite | 5.4.0 | Build tool & dev server |
| tailwindcss | 3.4.0 | Utility-first CSS |
| lucide-react | 0.400.0 | Icon library |
| recharts | 2.10.0 | Chart components |
| papaparse | 5.4.1 | CSV parser/generator |
| jspdf | 2.5.1 | PDF generation |
| jspdf-autotable | 3.8.2 | PDF table formatting |

## Product Categories

The system manages inventory and sales for five standard product categories:

- **Broiler** - Including boneless cuts and whole birds
- **Desi** - Native poultry varieties
- **Leghorn** - Leghorn breed birds and products
- **Hyderabadi** - Hyderabadi specialty poultry
- **Eggs** - All egg products across varieties

*Note: Feed category is intentionally excluded from inventory and sales tracking as per system design.*

## Current Status

This is Phase 1 of the Poultry Management System with the core layout and routing infrastructure established. The placeholder pages provide a foundation for team members to implement feature-specific functionality in subsequent phases.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Version

**1.0.0** - Initial Release

## License

All rights reserved.

## Support

For issues, questions, or feature requests, please contact the development team.
