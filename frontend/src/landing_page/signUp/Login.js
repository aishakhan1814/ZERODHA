import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [step, setStep] = useState("credentials"); // "credentials" | "otp"

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        user
      );

      // Password was correct — backend emailed an OTP. Move to step 2.
      setStep("otp");
      setMessage(`A verification code was sent to ${user.email}.`);
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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
        { email: user.email, otp }
      );

      const { token, user: loggedInUser } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // localStorage is per-origin: the frontend and dashboard run on
      // different domains/ports, so they can't share localStorage. Pass
      // the token across via URL so the dashboard app can pick it up and
      // store it in its own origin.
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

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      {step === "credentials" && (
        <form onSubmit={handleCredentialsSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#387ed1",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#387ed1",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "0.85rem",
              cursor: "pointer",
              color: "#387ed1",
            }}
            onClick={() => {
              setStep("credentials");
              setOtp("");
              setMessage("");
            }}
          >
            ← Back to login
          </p>
        </form>
      )}

      {message && (
        <p style={{ color: step === "otp" ? "green" : "red", textAlign: "center", marginTop: "10px" }}>
          {message}
        </p>
      )}

      {step === "credentials" && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link to="/signUp">Sign Up</Link>
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
};

export default Login;