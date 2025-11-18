import { useMemo } from 'react'

export default function AttendanceView({ staffList = [], attendanceData = {}, selectedDate, onDateChange = () => {}, onAttendanceToggle = () => {} }) {
  const presentCount = useMemo(() => {
    const map = attendanceData[selectedDate] || {}
    return Object.values(map).filter((v) => v === 'Present').length
  }, [attendanceData, selectedDate])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Attendance</h3>
          <p className="text-sm text-gray-600">Mark attendance for the selected date</p>
        </div>
        <div>
          <input type="date" value={selectedDate} onChange={(e) => onDateChange(e.target.value)} className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300" />
        </div>
      </div>

      <div className="text-sm text-gray-700">Present: <span className="font-semibold">{presentCount}</span> / Total: <span className="font-semibold">{staffList.length}</span></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((s) => {
          const status = (attendanceData[selectedDate] && attendanceData[selectedDate][s.id]) || 'Absent'
          const isPresent = status === 'Present'
          return (
            <div key={s.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-gray-900">{s.fullName}</div>
                  <div className="text-xs text-gray-500">{s.role}</div>
                </div>
                <div className="text-sm text-gray-600">{status}</div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => onAttendanceToggle(s.id, 'Present', selectedDate)} className={`${isPresent ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'} px-3 py-1 rounded`}>Present</button>
                <button onClick={() => onAttendanceToggle(s.id, 'Absent', selectedDate)} className={`${!isPresent ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'} px-3 py-1 rounded`}>Absent</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
