import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

import Layout from "../components/layout/Layout";
import "../components/common/card.css";
import "../components/layout/layout.css";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchDashboard();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const fetchDashboard = async () => {
    const res = await API.get("/admin/dashboard");
    setStats(res.data);
  };

  const toggleSuspend = async (user) => {
    const url = user.suspended
      ? `/admin/activate/${user.id}`
      : `/admin/suspend/${user.id}`;

    await API.put(url);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await API.delete(`/admin/delete/${id}`);
    fetchUsers();
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout type="admin">

      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* 🔥 STATS */}
      <div className="admin-grid">

        <div className="admin-stat">
          <h4>Total Users</h4>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="admin-stat">
          <h4>Total Files</h4>
          <h2>{stats.totalFiles}</h2>
        </div>

        <div className="admin-stat">
          <h4>Storage</h4>
          <h2>{formatSize(stats.totalStorage)}</h2>
        </div>

      </div>

      {/* 🔍 SEARCH */}
      <div className="admin-search-box">
        <input
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧾 RECENT FILES */}
      <div className="card">
        <h3>Recent Files</h3>

        {stats.recentFiles?.map(file => (
          <p key={file.id}>{file.fileName}</p>
        ))}
      </div>

      {/* 👥 USERS TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>

              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>

              <td>
                {user.suspended ? "Suspended" : "Active"}
              </td>

              <td>

                <button className="btn btn-warning"
                  onClick={() => toggleSuspend(user)}>
                  {user.suspended ? "Activate" : "Suspend"}
                </button>

                <button className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}>
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </Layout>
  );
}

export default AdminDashboard;


// helper
const formatSize = (bytes) => {
  if (!bytes) return "0B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
};