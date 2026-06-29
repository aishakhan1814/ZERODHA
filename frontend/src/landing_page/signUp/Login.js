import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Inject spinner keyframes once
const style = document.createElement("style");
style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

function Login() {
  const [step, setStep]       = useState("credentials"); // credentials | loading | otp
  const [user, setUser]       = useState({ email: "", password: "" });
  const [otp, setOtp]         = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [dots, setDots]       = useState(".");
  const timerRef  = useRef(null);
  const dotsRef   = useRef(null);

  const startCountdown = () => {
    setSeconds(30);
    timerRef.current = setInterval(() =>
      setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    dotsRef.current  = setInterval(() =>
      setDots(d => d.length >= 3 ? "." : d + "."), 500);
  };

  const stopCountdown = () => {
    clearInterval(timerRef.current);
    clearInterval(dotsRef.current);
  };

  useEffect(() => () => stopCountdown(), []);

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setMessage("");
    setStep("loading");
    startCountdown();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, user);
      stopCountdown();
      setStep("otp");
    } catch (err) {
      stopCountdown();
      setStep("credentials");
      setMessage(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  const handleVerify = async e => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
        { email: user.email, otp }
      );
      const { token, user: u } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(u));
      const params = new URLSearchParams({ token, user: JSON.stringify(u) });
      window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}/?${params}`;
    } catch (err) {
      setMessage(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>

      {/* ── credentials ── */}
      {step === "credentials" && (
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email"
            value={user.email} onChange={handleChange} style={inp} required />
          <input type="password" name="password" placeholder="Password"
            value={user.password} onChange={handleChange} style={inp} required />
          <button type="submit" style={btn}>Login</button>
          {message && <p style={errTxt}>{message}</p>}
          <p style={{ textAlign: "center", marginTop: 20 }}>
            Don't have an account? <Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      )}

      {/* ── loading ── */}
      {step === "loading" && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={spinner} />
          <p style={{ fontWeight: 700, fontSize: "1.05rem", margin: "18px 0 6px" }}>
            Sending your verification code{dots}
          </p>
          <p style={{ color: "#666", fontSize: "0.88rem", margin: "0 0 16px" }}>
            Please don't close this tab.
          </p>
          <div style={badge}>⏳ Hang tight — up to {seconds}s remaining</div>
        </div>
      )}

      {/* ── otp ── */}
      {step === "otp" && (
        <form onSubmit={handleVerify}>
          <p style={{ textAlign: "center", color: "#2d7a2d", marginBottom: 16, fontSize: "0.9rem" }}>
            A 6-digit code was sent to <strong>{user.email}</strong>
          </p>
          <input type="text" placeholder="Enter 6-digit code"
            value={otp} onChange={e => setOtp(e.target.value)}
            maxLength={6} style={{ ...inp, letterSpacing: 6, fontSize: "1.3rem", textAlign: "center" }}
            required />
          <button type="submit" disabled={loading} style={btn}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          {message && <p style={errTxt}>{message}</p>}
          <p style={{ textAlign: "center", marginTop: 14, fontSize: "0.85rem",
            cursor: "pointer", color: "#387ed1" }}
            onClick={() => { setStep("credentials"); setOtp(""); setMessage(""); }}>
            ← Back to login
          </p>
        </form>
      )}
    </div>
  );
}

const card = {
  width: 400, margin: "60px auto", padding: "36px 30px",
  border: "1px solid #ddd", borderRadius: 10, fontFamily: "sans-serif",
};
const inp = {
  width: "100%", padding: 10, marginBottom: 15,
  border: "1px solid #ccc", borderRadius: 4,
  boxSizing: "border-box", fontSize: "1rem",
};
const btn = {
  width: "100%", padding: 12, background: "#387ed1", color: "#fff",
  border: "none", borderRadius: 4, cursor: "pointer",
  fontSize: "1rem", fontWeight: 600,
};
const errTxt = { color: "red", textAlign: "center", marginTop: 12 };
const spinner = {
  width: 46, height: 46, margin: "0 auto",
  border: "4px solid #e0e0e0", borderTop: "4px solid #387ed1",
  borderRadius: "50%", animation: "spin 0.9s linear infinite",
};
const badge = {
  display: "inline-block", background: "#f0f6ff",
  border: "1px solid #c3d9f7", borderRadius: 20,
  padding: "6px 18px", fontSize: "0.82rem",
  color: "#387ed1", fontWeight: 600,
};

export default Login;
