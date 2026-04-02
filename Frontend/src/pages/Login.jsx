import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
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
      {/* Animated Floating Bubbles */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>

      <Card className="login-glass-card">
        <div className="login-header-section">
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
        
        /* Floating Bubbles Animation */
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          z-index: 1; 
          animation: floatBubble 10s infinite ease-in-out alternate;
        }
        .bubble-1 {
          width: 150px;
          height: 150px;
          top: 15%;
          left: 15%;
          animation-duration: 12s;
        }
        .bubble-2 {
          width: 250px;
          height: 250px;
          bottom: 10%;
          right: 15%;
          animation-duration: 18s;
          animation-delay: -5s;
        }
        .bubble-3 {
          width: 90px;
          height: 90px;
          top: 30%;
          right: 25%;
          animation-duration: 8s;
          animation-delay: -2s;
        }
        .bubble-4 {
          width: 120px;
          height: 120px;
          bottom: 30%;
          left: 10%;
          animation-duration: 14s;
          animation-delay: -8s;
        }

        @keyframes floatBubble {
          0% {
            transform: translateY(0) scale(1) translateX(0);
          }
          50% {
            transform: translateY(-30px) scale(1.05) translateX(15px);
          }
          100% {
            transform: translateY(20px) scale(0.95) translateX(-15px);
          }
        }
        .login-glass-card {
           position: relative;
           z-index: 2;
           width: 100%;
           max-width: 440px;
           padding: 40px;
           background: rgba(30, 41, 59, 0.7);
           backdrop-filter: blur(20px);
           -webkit-backdrop-filter: blur(20px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 24px;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .login-header-section {
          text-align: center;
          margin-bottom: 30px;
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