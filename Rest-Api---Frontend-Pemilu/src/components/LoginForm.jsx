// src/LoginPage.js
import React, { useState } from 'react';
import api from '../api/api';
import '../css/LoginForm.css'; // Buat file CSS terpisah agar rapi

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    api.post('/admin/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Login sukses');
          window.location.href = '/dashboard';
        } else {
          setError('Token tidak ditemukan.');
        }
      })
      .catch((error) => {
        console.error('Gagal login:', error.response?.data || error.message);
        setError('Email atau password salah.');
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login Admin</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
