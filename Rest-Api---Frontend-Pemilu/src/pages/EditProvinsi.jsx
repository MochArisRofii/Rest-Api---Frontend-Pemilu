import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/KotaPage.css";
import { toast } from "react-toastify";

function EditProvinsi() {
  const { id } = useParams();
  const [namaProvinsi, setNamaProvinsi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await api.get(`/admin/provinsi/${id}`);
        setNamaProvinsi(response.data.nama_provinsi);
      } catch (error) {
        toast.error("Gagal mengambil data provinsi");
      }
    };

    fetchProvinsi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/provinsi/${id}`, {
        nama_provinsi: namaProvinsi,
      });
      toast.success("Provinsi berhasil diperbarui");
      navigate("/provinsi");
    } catch (error) {
      toast.error("Gagal memperbarui provinsi");
    }
  };

  return (
    <div className="kota-container1">
      <h2>Edit Provinsi</h2>
      <form onSubmit={handleSubmit} className="form-kota">
        <div className="form-group">
          <label>Nama Provinsi</label>
          <input
            type="text"
            value={namaProvinsi}
            onChange={(e) => setNamaProvinsi(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Simpan Perubahan
        </button>
        <Link to="/provinsi" className="btn-back">
          &larr; Kembali ke Daftar Provinsi
        </Link>
      </form>
    </div>
  );
}

export default EditProvinsi;
