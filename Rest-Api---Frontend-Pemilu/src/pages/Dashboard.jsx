// src/Dashboard.js
import React from "react";
import "../css/Dashboard.css";
 // kita buat file CSS terpisah
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Dashboard Pemilu</div>
        <ul className="navbar-menu">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/kota">Kota</Link>
          </li>
          <li>
            <Link to="/provinsi">Provinsi</Link>
          </li>
          <li>
            <Link to="/presiden">Presiden & Wakil</Link>
          </li>
          <li>
            <Link to="/tps">TPS</Link>
          </li>
          <li>
            <Link to="/dpt">DPT</Link>
          </li>
          <li>
            <Link to="/calon-dpr">Calon DPR</Link>
          </li>
          <li>
            <Link to="/calon-dpd">Calon DPD</Link>
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <h2>Selamat datang di Dashboard Admin Pemilu</h2>
        <p>Silakan pilih menu di atas untuk mengelola data.</p>
      </div>
    </div>
  );
}

export default Dashboard;
