import { useEffect, useState } from "react";
import API from "../../api/axiosConfig";
import Layout from "../../components/layout/Layout";

function AdminNotifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      alert("Failed to load notifications");
    }
  };

  return (
    <Layout type="admin">
      <div className="content">

        <h2 className="dashboard-title">Notifications</h2>

        <div className="card">

          {notifications.length > 0 ? (
            notifications.map(n => (
              <div key={n.id} className="list-item">
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}

        </div>

      </div>
    </Layout>
  );
}

export default AdminNotifications;