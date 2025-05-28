"use client";

import * as React from "react";
import { useState } from "react";
import { LogIn, Lock, Mail, ChevronLeft } from "lucide-react";
import "./login.css";

const SignIn2 = ({ goToRegister, onSuccessLogin, goToMenuOverview }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    if (onSuccessLogin) {
      onSuccessLogin();
    }
  };

  return (
    <div>
      <button
        className="back-button"
        onClick={goToMenuOverview}
        aria-label="Back to menu overview"
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
            <LogIn className="icon" />
          </div>
          <h2 className="title">Sign in with email</h2>
          <p className="subtitle">
            Make a new doc to bring your words, data, and teams together. For
            free
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
            <div className="error-forgot-wrapper">
              {error && <div className="error-text">{error}</div>}
              <button className="forgot-btn">Forgot password?</button>
            </div>
          </div>
          <button onClick={handleSignIn} className="submit-btn">
            Get Started
          </button>
          <p className="register-link">
            Don't have an account?{" "}
            <button onClick={goToRegister}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn2;
