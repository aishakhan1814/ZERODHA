import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [step, setStep] = useState("credentials"); // "credentials" | "loading" | "otp"
  const [user, setUser] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Countdown timer state (shown while waiting for OTP email)
  const [countdown, setCountdown] = useState(0);
  const [dotCount, setDotCount] = useState(1);
  const countdownRef = useRef(null);
  const dotRef = useRef(null);

  const startLoadingUI = () => {
    setCountdown(30);
    setDotCount(1);

    // Countdown every second
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Animate dots independently
    dotRef.current = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
  };

  const stopLoadingUI = () => {
    clearInterval(countdownRef.current);
    clearInterval(dotRef.current);
    setCountdown(0);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(countdownRef.current);
      clearInterval(dotRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setStep("loading");
    startLoadingUI();

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, user);
      stopLoadingUI();
      setStep("otp");
      setMessage(`A verification code was sent to ${user.email}.`);
    } catch (err) {
      stopLoadingUI();
      setStep("credentials");
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
        { email: user.email, otp }
      );

      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      const params = new URLSearchParams({
        token,
        user: JSON.stringify(loggedInUser),
      });
      window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}/?${params.toString()}`;
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const dots = ".".repeat(dotCount);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>

      {/* ── STEP 1: Email + Password ── */}
      {step === "credentials" && (
        <form onSubmit={handleCredentialsSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button type="submit" style={btnStyle}>
            Login
          </button>
        </form>
      )}

      {/* ── STEP 2: Loading / Sending OTP ── */}
      {step === "loading" && (
        <div style={loadingBoxStyle}>
          <div style={spinnerStyle} />
          <p style={{ fontSize: "1.05rem", fontWeight: 600, margin: "16px 0 6px" }}>
            Sending your verification code{dots}
          </p>
          <p style={{ fontSize: "0.88rem", color: "#666", margin: "0 0 12px" }}>
            This usually takes a few seconds. Please don't close this page.
          </p>
          {countdown > 0 && (
            <div style={countdownBadgeStyle}>
              ⏳ Hang tight — up to {countdown}s remaining
            </div>
          )}
        </div>
      )}

      {/* ── STEP 3: OTP Entry ── */}
      {step === "otp" && (
        <form onSubmit={handleOtpSubmit}>
          <p style={{ textAlign: "center", color: "#2d7a2d", marginBottom: "16px", fontSize: "0.9rem" }}>
            {message}
          </p>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            style={{ ...inputStyle, letterSpacing: "6px", fontSize: "1.3rem", textAlign: "center" }}
            required
          />
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          <p
            style={{ textAlign: "center", marginTop: "14px", fontSize: "0.85rem", cursor: "pointer", color: "#387ed1" }}
            onClick={() => { setStep("credentials"); setOtp(""); setMessage(""); }}
          >
            ← Back to login
          </p>
        </form>
      )}

      {/* Error message (shown on credentials or otp step) */}
      {message && step !== "otp" && (
        <p style={{ color: "red", textAlign: "center", marginTop: "12px" }}>
          {message}
        </p>
      )}

      {step === "credentials" && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      )}
    </div>
  );
}

const containerStyle = {
  width: "400px",
  margin: "60px auto",
  padding: "36px 30px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontFamily: "sans-serif",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontSize: "1rem",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#387ed1",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
};

const loadingBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0 10px",
};

const spinnerStyle = {
  width: "44px",
  height: "44px",
  border: "4px solid #e0e0e0",
  borderTop: "4px solid #387ed1",
  borderRadius: "50%",
  animation: "spin 0.9s linear infinite",
};

const countdownBadgeStyle = {
  background: "#f0f6ff",
  border: "1px solid #c3d9f7",
  borderRadius: "20px",
  padding: "6px 16px",
  fontSize: "0.82rem",
  color: "#387ed1",
  fontWeight: 600,
};

// Inject keyframes once
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default Login;
