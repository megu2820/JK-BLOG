import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 


const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (provider: "google" | "facebook") => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="login-container">
    <div className="login-card">
      <h1 className="login-title">Welcome Back To JK Tech Blogs!</h1>
      <p className="login-subtitle">Login to continue</p>
      <button className="login-button google" onClick={() => handleLogin("google")}>
        🚀 Login with Google
      </button>
      <button className="login-button facebook" onClick={() => handleLogin("facebook")}>
        🔵 Login with Facebook
      </button>
    </div>
  </div>
  );
};

export default LoginPage;
