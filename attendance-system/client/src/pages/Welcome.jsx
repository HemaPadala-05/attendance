import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to College Attendance System</h1>
      <div className="space-x-4">
        <Link to="/login"><button className="bg-blue-600 text-white px-6 py-2 rounded">Login</button></Link>
        <Link to="/register"><button className="bg-green-600 text-white px-6 py-2 rounded">Register</button></Link>
      </div>
    </div>
  );
}
