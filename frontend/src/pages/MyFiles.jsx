import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

import Layout from "../components/layout/Layout";
import "../styles/style.css";
import "../components/layout/layout.css";
import "../components/common/card.css";

function MyFiles() {

  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await API.get("/files");
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (id) => {
    await API.delete(`/files/${id}`);
    fetchFiles();
  };

  const downloadFile = async (id, name) => {
    const res = await API.get(`/files/download/${id}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    link.click();
  };

  return (
    <Layout type="user">
      <div className="content">
        <h2>My Files</h2>

        <div className="card">

          {files.map(file => (
            <div key={file.id} className="list-item">

              <span>
                <i className="fa-solid fa-file user-icon-file"></i>
                {file.fileName}
              </span>

              <div style={{ display: "flex", gap: "10px" }}>

                <button className="btn btn-success"
                  onClick={() => downloadFile(file.id, file.fileName)}>
                  Download
                </button>

                <button className="btn btn-danger"
                  onClick={() => deleteFile(file.id)}>
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}

export default MyFiles;