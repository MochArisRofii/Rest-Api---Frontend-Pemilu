import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "../css/EditKotaPage.css";

function EditKotaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [namaKota, setNamaKota] = useState("");
  const [provinsiId, setProvinsiId] = useState("");
  const [provinsiList, setProvinsiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/admin/kota/${id}`)
      .then((res) => {
        setNamaKota(res.data.nama);
        setProvinsiId(res.data.provinsi_id);
      })
      .catch(() => setError("Gagal mengambil data kota"));

    api
      .get("/admin/provinsi")
      .then((res) => {
        setProvinsiList(res.data);
        setLoading(false);
      })
      .catch(() => setError("Gagal mengambil data provinsi"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/kota/${id}`, {
        nama: namaKota,
        provinsi_id: provinsiId,
      });
      navigate("/kota");
    } catch (err) {
      setError("Gagal memperbarui kota");
    }
  };

  return (
    <div className="form-page">
      <h2>Edit Kota</h2>

      {/* Tombol kembali */}
      <Link to="/kota" className="btn-back">
        &larr; Kembali ke Daftar Kota
      </Link>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="form-box">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label>Nama Kota:</label>
            <input
              type="text"
              value={namaKota}
              onChange={(e) => setNamaKota(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Provinsi:</label>
            <select
              value={provinsiId}
              onChange={(e) => setProvinsiId(e.target.value)}
              required
            >
              <option value="">-- Pilih Provinsi --</option>
              {provinsiList.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nama_provinsi}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-submit">
            Simpan Perubahan
          </button>
        </form>
      )}
    </div>
  );
}

export default EditKotaPage;
