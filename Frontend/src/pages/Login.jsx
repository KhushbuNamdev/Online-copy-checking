import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import "../styles/global.css";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import bgImage from "../assets/background.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUserThunk(formData));
    if (res.payload?.token) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-glass-card">
        <div className="login-header-section">
          <div className="brand-logo-container">
            <div className="logo-glow"></div>
            <div className="logo-icon-box">
              <FileText size={32} color="#fff" strokeWidth={1.5} />
              <Search size={22} color="#0cebeb" className="search-lens-icon" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="login-page-title">Copy Checker</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="glass-input"
            wrapperClassName="glass-input-wrapper"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="glass-input"
            wrapperClassName="glass-input-wrapper"
          />

          <Button
            type="submit"
            disabled={loading}
            className="login-action-btn"
          >
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <div className="login-footer">
          <p>© 2026 Online Copy Checker. All Rights Reserved.</p>
        </div>
      </Card>

      <style>{`
        .login-page-container {
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100vw;
          position: relative;
        }
        .login-page-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.6); /* dark overlay to make card pop */
          z-index: 0;
        }
        
        .login-glass-card {
           position: relative;
           z-index: 2;
           width: 100%;
           max-width: 440px;
           padding: 40px;
           background: rgba(30, 41, 59, 0.15);
           backdrop-filter: blur(30px);
           -webkit-backdrop-filter: blur(30px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 24px;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .login-header-section {
          text-align: center;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .brand-logo-container {
          position: relative;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.3);
        }
        .logo-glow {
          position: absolute;
          inset: -5px;
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 50%;
          animation: pulseGlow 3s infinite;
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .logo-icon-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-lens-icon {
          position: absolute;
          bottom: -5px;
          right: -8px;
          filter: drop-shadow(0 0 5px rgba(12, 235, 235, 0.6));
        }
        .login-page-title {
          font-size: 28px;
          font-weight: 800;
          color: white;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-form label {
          display: block;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        .login-action-btn {
          width: 50%;
          margin: 20px auto 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-error {
          margin-top: 20px;
          padding: 10px 20px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          color: #f87171;
          font-size: 14px;
        }
        .login-footer {
          margin-top: 30px;
          color: var(--text-dim);
          font-size: 11px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;