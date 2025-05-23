import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance data for logged-in student
    async function fetchAttendance() {
      try {
        const res = await axios.get('http://localhost:5000/students/attendance', {
          // You can send auth token here if implemented
          // headers: { Authorization: `Bearer ${token}` }
        });
        setAttendanceRecords(res.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

      {loading ? (
        <p>Loading attendance...</p>
      ) : attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td className="border px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                <td className={`border px-4 py-2 ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
