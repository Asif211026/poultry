import { useMemo, useState } from 'react'
import StaffTable from '../components/staff/StaffTable'
import AddStaffModal from '../components/staff/AddStaffModal'
import AttendanceView from '../components/staff/AttendanceView'
import PayrollTable from '../components/staff/PayrollTable'
import TabNavigation from '../components/rates/TabNavigation'

// Mock data generators
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateMockStaff() {
  const roles = ['Manager', 'Supervisor', 'Accountant', 'Worker', 'Sales']
  const statuses = ['Active', 'Inactive']
  const names = ['Arjun Kumar','Meera Singh','Ravi Patel','Sunita Rao','Karan Verma','Priya Nair','Vikram Joshi','Anita Desai','Sahil Shah','Deepa Menon']

  const staff = names.slice(0, 10).map((name, idx) => {
    const role = randomFrom(roles)
    const monthlySalary = Math.floor((role === 'Manager' ? 40000 : role === 'Accountant' ? 30000 : role === 'Supervisor' ? 28000 : role === 'Sales' ? 22000 : 16000) + Math.random() * 5000)
    const joinDate = new Date(Date.now() - (365 * 24 * 3600 * 1000 * (Math.floor(Math.random() * 5) + 0))).toISOString().slice(0,10)
    const status = idx % 7 === 0 ? 'Inactive' : 'Active'
    return { id: String(1000 + idx), fullName: name, role, phone: String(9000000000 + idx), email: `${name.split(' ')[0].toLowerCase()}@example.com`, monthlySalary, joinDate, status }
  })
  return staff
}

function generateMockAttendance(staffList) {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d.toISOString().slice(0,10))
  }

  const attendance = {}
  days.forEach((date) => {
    attendance[date] = {}
    staffList.forEach((s) => {
      attendance[date][s.id] = Math.random() > 0.2 ? 'Present' : 'Absent'
    })
  })
  return attendance
}

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState('staff-list') // 'staff-list' | 'attendance' | 'payroll'

  const [staffList, setStaffList] = useState(() => generateMockStaff())

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)

  const [attendanceData, setAttendanceData] = useState(() => generateMockAttendance(staffList)) // lazy init
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10))

  const payrollData = useMemo(() => {
    // derive payroll rows from staffList and attendanceData deterministically
    // workingDays = number of days in current month where staff marked Present
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    // build list of dates for current month that exist in attendanceData
    const attendanceDates = Object.keys(attendanceData).filter((d) => {
      const dt = new Date(d + 'T00:00:00')
      return dt.getFullYear() === year && dt.getMonth() === month
    })

    return staffList.map((s) => {
      const base = Number(s.monthlySalary) || 0
      // count present days in current month
      let workingDays = 0
      attendanceDates.forEach((date) => {
        const dayMap = attendanceData[date] || {}
        if (dayMap[s.id] === 'Present') workingDays += 1
      })

      const overtimeHours = 0
      const hourlyRate = base / 30 / 8
      const totalSalary = (base / 30) * workingDays + overtimeHours * hourlyRate
      return { id: s.id, fullName: s.fullName, role: s.role, baseSalary: base, workingDays, overtimeHours, totalSalary }
    })
  }, [staffList, attendanceData])

  const handleOpenAdd = () => {
    setEditingStaff(null)
    setIsModalOpen(true)
  }

  const handleEdit = (staff) => {
    setEditingStaff(staff)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this staff member?')) return
    setStaffList((s) => s.filter((x) => x.id !== id))
  }

  const handleModalSubmit = (data) => {
    if (data.id) {
      // update
      setStaffList((s) => s.map((x) => (x.id === data.id ? { ...x, ...data } : x)))
    } else {
      // add
      const newItem = { ...data, id: Date.now().toString() }
      setStaffList((s) => [newItem, ...s])
    }
  }

  const handleAttendanceToggle = (staffId, status, date) => {
    setAttendanceData((prev) => {
      const day = prev[date] ? { ...prev[date] } : {}
      day[staffId] = status
      return { ...prev, [date]: day }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-600 mt-2">Manage employees, attendance and payroll</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          {(() => {
            const TABS = [
              { id: 'staff-list', label: 'Staff List' },
              { id: 'attendance', label: 'Attendance' },
              { id: 'payroll', label: 'Payroll' },
            ]
            return <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          })()}
        </div>

        <div className="ml-4">
          <button onClick={handleOpenAdd} className="px-4 py-2 rounded bg-primary-600 text-white">Add Staff</button>
        </div>
      </div>

      <div>
        {activeTab === 'staff-list' && (
          <StaffTable staffList={staffList} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {activeTab === 'attendance' && (
          <AttendanceView staffList={staffList} attendanceData={attendanceData} selectedDate={selectedDate} onDateChange={setSelectedDate} onAttendanceToggle={handleAttendanceToggle} />
        )}

        {activeTab === 'payroll' && (
          <PayrollTable payrollData={payrollData} />
        )}
      </div>

      <AddStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} initialData={editingStaff} mode={editingStaff ? 'edit' : 'add'} />
    </div>
  )
}
