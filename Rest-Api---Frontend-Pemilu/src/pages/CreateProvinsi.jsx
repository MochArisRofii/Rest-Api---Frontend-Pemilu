import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../css/KotaPage.css";
import { toast } from "react-toastify";

function CreateProvinsi() {
  const [namaProvinsi, setNamaProvinsi] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/provinsi", { nama_provinsi: namaProvinsi });
      toast.success("Provinsi berhasil ditambahkan");
      navigate("/provinsi");
    } catch (error) {
      toast.error("Gagal menambahkan provinsi");
    }
  };

  return (
    <div className="kota-container1">
      <h2>Tambah Provinsi</h2>
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
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreateProvinsi;
