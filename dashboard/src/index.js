import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

// localStorage is per-origin. The frontend (localhost:3000) and dashboard
// (localhost:3001) cannot read each other's localStorage. When the login
// page redirects here, it appends ?token=...&user=... to the URL. Pick those
// up once, store them in this origin's own localStorage, then strip them
// from the URL so they don't linger in the address bar or browser history.
function hydrateAuthFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const user = params.get("user");

  if (token) {
    localStorage.setItem("token", token);
  }
  if (user) {
    localStorage.setItem("user", user);
  }

  if (token || user) {
    window.history.replaceState({}, "", window.location.pathname);
  }
}

hydrateAuthFromUrl();

function ProtectedApp() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/login`;
    return null;
  }

  return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ProtectedApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);