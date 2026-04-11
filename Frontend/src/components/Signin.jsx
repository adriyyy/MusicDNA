import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log("Autentificare backend reușită:", data);
        localStorage.setItem("token", data.token);
      } else {
        console.error("Autentificare backend eșuată:", data);
      }
    } catch (error) {
      console.error("Eroare la apelarea backend-ului:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Autentificare Google eșuată");
  };

  return (
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h1>Autentificare cu Google</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
}
