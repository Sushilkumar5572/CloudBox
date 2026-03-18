import { useEffect, useState } from "react";
import "../styles/style.css";

function UserDashboard() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile
  useEffect(() => {
    fetch("http://localhost:8080/api/user/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Update profile
  const updateProfile = () => {
    fetch("http://localhost:8080/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditMode(false);
        alert("Profile updated successfully");
      });
  };

  // ⏳ Loading state
  if (loading) {
    return <h3 className="text-center mt-10">Loading profile...</h3>;
  }

  return (
  <div className="profile-wrapper">
    <div className="profile-card">

      <h2>User Profile</h2>

      {!editMode ? (
        <>
          <div className="profile-row">
            <span>First Name</span>
            <strong>{user.firstName}</strong>
          </div>

          <div className="profile-row">
            <span>Last Name</span>
            <strong>{user.lastName}</strong>
          </div>

          <div className="profile-row">
            <span>Gender</span>
            <strong>{user.gender}</strong>
          </div>

          <div className="profile-row">
            <span>Age</span>
            <strong>{user.age}</strong>
          </div>

          <div className="profile-row">
            <span>Location</span>
            <strong>{user.location}</strong>
          </div>

          <button
            className="btn btn-primary btn-full mt-10"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <label>First Name</label>
          <input name="firstName" value={user.firstName || ""} onChange={handleChange} />

          <label>Last Name</label>
          <input name="lastName" value={user.lastName || ""} onChange={handleChange} />

          <label>Gender</label>
          <select name="gender" value={user.gender || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Age</label>
          <input name="age" value={user.age || ""} onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={user.location || ""} onChange={handleChange} />

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-success btn-full" onClick={updateProfile}>
              Save
            </button>

            <button className="btn btn-danger btn-full" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default UserDashboard;