"use client";

import * as React from "react";
import { useState } from "react";
import { UserPlus, Lock, Mail, ChevronLeft } from "lucide-react";
import "./register.css";

interface RegisterProps {
  goToLogin?: () => void;
}

const Register: React.FC<RegisterProps> = ({ goToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }
    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }
    setError("");
    alert("Registrierung erfolgreich! (Demo)");
  };

  return (
    <div>
      <button
        className="back-button"
        onClick={goToLogin}
        aria-label="Zurück zum Login"
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
          <h2 className="title">Konto erstellen</h2>
          <p className="subtitle">Werde Teil der Mensa-App!</p>
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
            <div className="input-wrapper">
              <span className="input-icon lock-icon">
                <Lock className="icon-small" />
              </span>
              <input
                placeholder="Passwort bestätigen"
                type="password"
                value={confirmPassword}
                className="input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-text">{error}</div>}
          </div>
          <button onClick={handleRegister} className="submit-btn">
            Registrieren
          </button>
          <p className="register-link">
            Schon ein Konto? <button onClick={goToLogin}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
