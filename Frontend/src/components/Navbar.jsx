import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Autentificare Google reușită:", credentialResponse);
    fetch("http://localhost:8000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Răspuns login:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsSignedIn(true);
          toast.success("Autentificare reușită!");
        } else {
          toast.error("Autentificare eșuată!");
        }
      })
      .catch((err) => {
        console.error("Eroare la autentificare:", err);
        toast.error("Autentificare eșuată!");
      });
  };

  const handleGoogleLoginError = () => {
    console.error("Autentificare Google eșuată");
    toast.error("Autentificare eșuată. Încearcă din nou.");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSignedIn(false);
    toast.success("Te-ai deconectat cu succes!");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold ml-4">
          <a href="/" className="transition cursor-pointer hover:underline">
            Acasă
          </a>
        </div>

        <div className="flex items-center space-x-6">
          {isSignedIn && (
            <>
              <a href="/music" className="hover:underline">
                Muzică
              </a>
              <a href="/dashboard" className="hover:underline">
                Recomandări
              </a>
              <a href="/stats" className="hover:underline">
                Statistici
              </a>
            </>
          )}

          {!isSignedIn ? (
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded transition-all duration-200"
            >
              Deconectare
            </button>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
