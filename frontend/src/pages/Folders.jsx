import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Layout from "../components/layout/Layout";

function Folders() {

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await API.get("/files");

    const unique = [...new Set(res.data.map(f => f.folder))];
    setFolders(unique);
  };

  return (
    <Layout type="user">
      <div className="content">
        <h2>Folders</h2>

        <div className="card">
          {folders.map(f => (
            <div key={f} className="list-item">
              📁 {f}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Folders;