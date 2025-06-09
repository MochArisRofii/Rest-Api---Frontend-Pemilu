import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/CreateKotaPage.css';

function CreateKotaPage() {
  const [nama, setNama] = useState('');
  const [provinsiId, setProvinsiId] = useState('');
  const [provinsis, setProvinsis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/provinsi')
      .then(response => {
        setProvinsis(response.data);
      })
      .catch(() => {
        toast.error('Gagal mengambil data provinsi');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !provinsiId) {
      toast.error('Semua field harus diisi');
      return;
    }

    api.post('/admin/kota', {
      nama,
      provinsi_id: provinsiId,
    })
      .then(() => {
        toast.success('Kota berhasil ditambahkan');
        setTimeout(() => {
          navigate('/kota');
        }, 1500);
      })
      .catch(() => {
        toast.error('Gagal menambahkan kota');
      });
  };

  return (
    <div className="kota-container">
      <h2>Tambah Kota</h2>

      <form onSubmit={handleSubmit} className="form-kota">
        <div className="form-group">
          <label>Nama Kota:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama kota"
          />
        </div>

        <div className="form-group">
          <label>Pilih Provinsi:</label>
          <select
            value={provinsiId}
            onChange={(e) => setProvinsiId(e.target.value)}
          >
            <option value="">-- Pilih Provinsi --</option>
            {provinsis.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nama_provinsi}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Simpan</button>
        <Link className="back-btn" to="/kota">Kembali</Link>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default CreateKotaPage;
