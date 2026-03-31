import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

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

  // ✅ FIXED LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUserThunk(formData));

    // if login success → go dashboard
    if (res.payload?.token) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;