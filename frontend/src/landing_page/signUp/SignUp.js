import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [slowHint, setSlowHint] = useState(false);


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

   let slowTimer;

    try {
      setLoading(true);
      setSlowHint(false);

      slowTimer = setTimeout(() => setSlowHint(true), 6000);

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      setMessage(res.data.message || "Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server not responding.");
      }
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowHint(false);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
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
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        {slowHint && (
          <p
            style={{
              textAlign: "center",
              marginTop: "12px",
              fontSize: "0.85rem",
              color: "#888",
            }}
          >
            Still working — our server is waking up after being idle, this can take up to a minute.
          </p>
        )}
      </form>

      {message && (
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            color: "red",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default SignUp;