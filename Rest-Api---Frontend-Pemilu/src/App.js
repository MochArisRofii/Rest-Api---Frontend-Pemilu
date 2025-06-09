// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import KotaPage from './pages/Kotapage';
import CreateKotaPage from './pages/CreateKotaPage';
import EditKotaPage from './pages/EditKotaPage';
import ProvinsiPage from './pages/ProvinsiPage';
import CreateProvinsi from './pages/CreateProvinsi';
import EditProvinsi from './pages/EditProvinsi';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/kota' element={<KotaPage />} />
        <Route path='/kota/create' element={<CreateKotaPage />} />
        <Route path="/kota/edit/:id" element={<EditKotaPage />} />
        <Route path="/provinsi" element={<ProvinsiPage />} />
        <Route path='/provinsi/create' element={<CreateProvinsi />} />
        <Route path='/provinsi/edit/:id' element={<EditProvinsi />} />

      </Routes>
    </Router>
  );
}

export default App;
