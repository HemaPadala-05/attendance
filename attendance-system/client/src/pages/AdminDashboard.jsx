import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link
          to="/admin/allocate-class-teachers"
          className="block bg-indigo-600 text-white text-center py-3 rounded hover:bg-indigo-700"
        >
          Allocate Class Teachers
        </Link>

        <Link
          to="/admin/upload-timetable"
          className="block bg-teal-600 text-white text-center py-3 rounded hover:bg-teal-700"
        >
          Upload Timetable
        </Link>
      </div>
    </div>
  );
}
