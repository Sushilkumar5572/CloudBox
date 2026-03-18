import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser({ email, password });

      // ✅ Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      alert(err.response?.data || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Login to CloudBox</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="btn btn-primary btn-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Links */}
        <Link to="/reset-password">Forgot Password?</Link>

        <div className="divider"></div>

        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
}

export default Login;