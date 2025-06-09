import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/KotaPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KotaPage() {
  const [kotas, setKotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchKotas();
  }, []);

  const fetchKotas = () => {
    api
      .get("/admin/kota")
      .then((response) => {
        setKotas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Gagal mengambil data kota"); // ⬅ toast error
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kota ini?")) {
      try {
        await api.delete(`/admin/kota/${id}`);
        toast.success("Kota berhasil dihapus"); // ⬅ toast sukses
        fetchKotas();
      } catch (err) {
        toast.error("Gagal menghapus kota"); // ⬅ toast error
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // ⬅ arahkan ke halaman login atau landing page
  };

  return (
    <div className="kota-page">
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

      <div className="kota-container1">
        <div className="kota-header1">
          <h2>Data Kota</h2>
          <Link to="/kota/create" className="btn-add">
            + Tambah Kota
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table className="kota-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Kota</th>
                <th>Provinsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kotas.map((kota) => (
                <tr key={kota.id}>
                  <td>{kota.id}</td>
                  <td>{kota.nama}</td>
                  <td>{kota.provinsi.nama_provinsi}</td>
                  <td>
                    <Link
                      to={`/kota/edit/${kota.id}`}
                      className="btn-edit"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(kota.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
}

export default KotaPage;
