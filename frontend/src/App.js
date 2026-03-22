import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

import MyFiles from "./pages/MyFiles";
import Upload from "./pages/Upload";
import Folders from "./pages/Folders";
import Profile from "./pages/Profile";

// ✅ Sidebar pages
import SharedWithMe from "./pages/SharedWithMe";
import SharedByMe from "./pages/SharedByMe";
import Collaboration from "./pages/Collaboration";
import ActivityHistory from "./pages/ActivityHistory";
import ProtectedRoute from "./auth/ProtectedRoute";

import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= USER ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/files"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <MyFiles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/folders"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Folders />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIXED ROUTES */}

        <Route
          path="/shared-with"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <SharedWithMe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shared-by"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <SharedByMe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collab"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Collaboration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <ActivityHistory />
            </ProtectedRoute>
        }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;