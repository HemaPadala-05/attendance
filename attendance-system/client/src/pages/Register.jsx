import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // student or teacher
  const [name, setName] = useState('');
  const [faceImage, setFaceImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!faceImage) {
      alert('Please upload your face image for registration');
      return;
    }

    try {
      // First, upload face image to face API
      const formData = new FormData();
      formData.append('image', faceImage);
      formData.append('name', username);

      await axios.post('http://localhost:5001/register-face', formData);

      // Then save user in backend DB
      await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
        role,
        name
      });

      alert('Registration successful! You can now login.');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl mb-6">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-80">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFaceImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
