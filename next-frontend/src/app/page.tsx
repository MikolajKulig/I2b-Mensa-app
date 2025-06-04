"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import MenuOverview from "./components/MenuOverview";
import Login from "./components/Login";
import Register from "./components/Register";

export default function HomePage() {
  const [page, setPage] = useState<"menu" | "login" | "register">("menu");
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogout = () => {
    setUserName(null);
    setPage("menu");
  };

  const handleLoginSuccess = (name = "Max Mustermann") => {
    setUserName(name);
    setPage("menu");
  };

  return (
    <>
      {page === "menu" && (
        <>
          <Header
            userName={userName}
            onLogout={handleLogout}
            onLoginClick={() => setPage("login")}
          />
          <MenuOverview />
        </>
      )}
      {page === "login" && (
        <Login
          onSuccessLogin={() => handleLoginSuccess("Max Mustermann")}
          goToRegister={() => setPage("register")}
          goToMenuOverview={() => setPage("menu")}
        />
      )}
      {page === "register" && <Register goToLogin={() => setPage("login")} />}
    </>
  );
}
