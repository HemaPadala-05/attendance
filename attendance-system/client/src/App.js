import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
// Import other dashboard components as you implement them
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
// import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add dashboard routes here */}
      </Routes>
    </Router>
  );
}

export default App;
