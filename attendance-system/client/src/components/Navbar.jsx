import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        Attendance System
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="hover:underline">
                  Admin Dashboard
                </Link>
              </>
            )}

            {user.role === 'teacher' && (
              <>
                <Link to="/teacher/dashboard" className="hover:underline">
                  Teacher Dashboard
                </Link>
              </>
            )}

            {user.role === 'student' && (
              <>
                <Link to="/student/dashboard" className="hover:underline">
                  Student Dashboard
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
