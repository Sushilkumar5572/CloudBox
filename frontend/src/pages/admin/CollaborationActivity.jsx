import { useEffect, useState } from "react";
import API from "../../api/axiosConfig";
import Layout from "../../components/layout/Layout";

function CollaborationActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await API.get("/admin/collaboration");
      setActivities(res.data);
    } catch (err) {
      alert("Failed to fetch activity");
    }
  };

  return (
    <Layout type="admin">
      <div className="content">

        <h2 className="dashboard-title">Collaboration Activity</h2>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>File</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {activities.map(a => (
                <tr key={a.id}>
                  <td>{a.userEmail}</td>
                  <td>{a.action}</td>
                  <td>{a.fileName}</td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default CollaborationActivity;