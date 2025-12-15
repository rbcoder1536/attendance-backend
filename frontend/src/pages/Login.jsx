import { useState } from "react";
import { login } from "../api";
import { setToken } from "../auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);

    const res = await login({ email, password });

    if (res.token) {
      setToken(res.token);
      onLogin();
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">HRFlow</h1>
        <p className="login-subtitle">
          Employee Attendance & Leave System
        </p>

        <div className="login-field">
          <label>Email</label>
          <input
            placeholder="admin@company.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="login-error">{error}</div>}

        <button
          className="primary login-btn"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <div className="login-hint">
          Demo access: <b>admin@company.com</b> / <b>admin123</b>
        </div>
      </div>
    </div>
  );
}
