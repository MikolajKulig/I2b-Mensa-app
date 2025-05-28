"use client";

import * as React from "react";
import { useState } from "react";
import { UserPlus, Lock, Mail, ChevronLeft } from "lucide-react";
import "./register.css";

const Register = ({ goToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    alert("Registration successful! (Demo)");
  };

  return (
    <div>
      <button
        className="back-button"
        onClick={goToLogin}
        aria-label="Back to login"
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 5,
          fontSize: 24,
          color: "#333",
          zIndex: 1000,
        }}
      >
        <ChevronLeft />
      </button>

      <div className="container">
        <div className="card">
          <div className="icon-wrapper">
            <UserPlus className="icon" />
          </div>
          <h2 className="title">Create your account</h2>
          <p className="subtitle">
            Join us and bring your ideas to life.
          </p>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon mail-icon">
                <Mail className="icon-small" />
              </span>
              <input
                placeholder="Email"
                type="email"
                value={email}
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span className="input-icon lock-icon">
                <Lock className="icon-small" />
              </span>
              <input
                placeholder="Password"
                type="password"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span className="input-icon lock-icon">
                <Lock className="icon-small" />
              </span>
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                className="input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-text">{error}</div>}
          </div>
          <button onClick={handleRegister} className="submit-btn">
            Register
          </button>
          <p className="register-link">
            Have an account?{" "}
            <button onClick={goToLogin}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
