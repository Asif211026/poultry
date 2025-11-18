import { FileDown, FileText } from 'lucide-react'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportButtons({ data = [], filename = 'report', reportType = 'daily' }) {
  const handleExportCSV = () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const timestamp = new Date().toISOString().slice(0, 10)
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}-${timestamp}.csv`
    link.click()
  }

  const handleExportPDF = () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    const doc = new jsPDF()
    const timestamp = new Date().toLocaleString()
    const reportTitle = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Sales Report`

    // Add title and date
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(reportTitle, 14, 15)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated on: ${timestamp}`, 14, 25)

    // Add table
    const columns = Object.keys(data[0])
    const rows = data.map((item) => columns.map((col) => item[col]))

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 35,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
      },
      margin: { top: 35 },
    })

    const timestamp2 = new Date().toISOString().slice(0, 10)
    doc.save(`${filename}-${timestamp2}.pdf`)
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportCSV}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm text-gray-700 font-medium"
      >
        <FileDown size={16} />
        Export CSV
      </button>
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm text-gray-700 font-medium"
      >
        <FileText size={16} />
        Export PDF
      </button>
    </div>
  )
}
