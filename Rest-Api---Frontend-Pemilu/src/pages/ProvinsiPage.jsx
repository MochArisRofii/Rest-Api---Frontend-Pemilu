import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/ProvinsiPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProvinsiPage() {
  const [provinsis, setProvinsis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProvinsis();
  }, []);

  const fetchProvinsis = () => {
    api
      .get("/admin/provinsi")
      .then((response) => {
        setProvinsis(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Gagal mengambil data provinsi");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus provinsi ini?")) {
      try {
        await api.delete(`/admin/provinsi/${id}`);
        toast.success("Provinsi berhasil dihapus");
        fetchProvinsis();
      } catch (err) {
        toast.error("Gagal menghapus provinsi");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="provinsi-page">
      <nav className="navbar">
        <div className="navbar-brand">Dashboard Pemilu</div>
        <ul className="navbar-menu">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/kota">Kota</Link></li>
          <li><Link to="/provinsi">Provinsi</Link></li>
          <li><Link to="/presiden">Presiden & Wakil</Link></li>
          <li><Link to="/tps">TPS</Link></li>
          <li><Link to="/dpt">DPT</Link></li>
          <li><Link to="/calon-dpr">Calon DPR</Link></li>
          <li><Link to="/calon-dpd">Calon DPD</Link></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="provinsi-container1">
        <div className="provinsi-header1">
          <h2>Data Provinsi</h2>
          <Link to="/provinsi/create" className="btn-add">
            + Tambah Provinsi
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table className="provinsi-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Provinsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {provinsis.map((provinsi) => (
                <tr key={provinsi.id}>
                  <td>{provinsi.id}</td>
                  <td>{provinsi.nama_provinsi}</td>
                  <td>
                    <Link to={`/provinsi/edit/${provinsi.id}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(provinsi.id)}
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

export default ProvinsiPage;
