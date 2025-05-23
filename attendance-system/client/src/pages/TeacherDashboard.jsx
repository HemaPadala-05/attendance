import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  // You can determine the teacher type from user role or a dropdown here
  const [teacherType, setTeacherType] = useState('class'); // 'class' or 'subject'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="mb-6">
        <label htmlFor="teacherType" className="block mb-2 font-semibold">
          Select Teacher Type:
        </label>
        <select
          id="teacherType"
          value={teacherType}
          onChange={(e) => setTeacherType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="class">Class Teacher</option>
          <option value="subject">Subject Teacher</option>
        </select>
      </div>

      {teacherType === 'class' ? (
        <div className="space-y-4">
          <Link
            to="/teacher/class/view-attendance"
            className="block bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700"
          >
            View Attendance
          </Link>
          <Link
            to="/teacher/class/irregular-students"
            className="block bg-red-600 text-white text-center py-3 rounded hover:bg-red-700"
          >
            Irregular Students List
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Link
            to="/teacher/subject/generate-qr"
            className="block bg-green-600 text-white text-center py-3 rounded hover:bg-green-700"
          >
            QR Code Generator
          </Link>
          <Link
            to="/teacher/subject/view-attendance"
            className="block bg-purple-600 text-white text-center py-3 rounded hover:bg-purple-700"
          >
            View Attendance
          </Link>
        </div>
      )}
    </div>
  );
}
