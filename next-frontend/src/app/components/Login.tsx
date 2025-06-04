"use client";

import * as React from "react";
import { useState } from "react";
import { LogIn, Lock, Mail, ChevronLeft } from "lucide-react";
import "./login.css";

interface LoginProps {
  goToRegister?: () => void;
  onSuccessLogin?: () => void;
  goToMenuOverview?: () => void;
}

const Login: React.FC<LoginProps> = ({
  goToRegister,
  onSuccessLogin,
  goToMenuOverview,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Bitte E-Mail und Passwort eingeben.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Bitte eine gültige E-Mail-Adresse eingeben.");
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
        aria-label="Zurück zur Übersicht"
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
          <h2 className="title">Anmelden mit E-Mail</h2>
          <p className="subtitle">
            Melde dich an, um das Mensa-Angebot zu nutzen.
          </p>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon mail-icon">
                <Mail className="icon-small" />
              </span>
              <input
                placeholder="E-Mail"
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
                placeholder="Passwort"
                type="password"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="error-forgot-wrapper">
              {error && <div className="error-text">{error}</div>}
              <button className="forgot-btn">Passwort vergessen?</button>
            </div>
          </div>
          <button onClick={handleSignIn} className="submit-btn">
            Los geht's
          </button>
          <p className="register-link">
            Noch kein Konto?{" "}
            <button onClick={goToRegister}>Registrieren</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
