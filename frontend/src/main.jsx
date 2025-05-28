import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import SignIn2 from "./components/Login";
import Register from "./components/Register";
import MenuOverview from "./components/MenuOverview";
import Header from "./components/Header";

const App = () => {
  const [page, setPage] = useState("menu"); 
  const [userName, setUserName] = useState(null);

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
        <SignIn2
          onSuccessLogin={() => handleLoginSuccess("Max Mustermann")}
          goToRegister={() => setPage("register")}
          goToMenuOverview={() => setPage("menu")}  
        />
)}

      {page === "register" && (
        <Register goToLogin={() => setPage("login")}
          goToMenuOverview={() => setPage("menu")}
        />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
