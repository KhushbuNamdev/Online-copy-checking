import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/global.css";

// icons
import dashboardIcon from "../assets/dashboard.png";
import syllabusIcon from "../assets/syllabus.png";
import questionIcon from "../assets/question.png";
import historyIcon from "../assets/history.png";
import settingsIcon from "../assets/settings.png";
import profilePic from "../assets/profilep.jpg";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>✔️CopyChecker</h2>
        <ul>
          <li><Link to="/dashboard" className="nav-link">
            <img src={dashboardIcon} className="menu-icon" alt="" />
            Dashboard
          </Link></li>

          <li><Link to="/syllabus" className="nav-link">
            <img src={syllabusIcon} className="menu-icon" alt="" />
            Syllabus
          </Link></li>

          <li><Link to="/question-paper" className="nav-link">
            <img src={questionIcon} className="menu-icon" alt="" />
            Question Paper
          </Link></li>

          <li><Link to="/history" className="nav-link">
            <img src={historyIcon} className="menu-icon" alt="" />
            History
          </Link></li>

          <li><Link to="/settings" className="nav-link">
            <img src={settingsIcon} className="menu-icon" alt="" />
            Settings
          </Link></li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">

        {/* Navbar */}
        <div className="navbar">
          <h3>Dashboard</h3>

          {/* PROFILE DROPDOWN */}
          <div className="profile-box" ref={dropdownRef}>
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={profilePic} alt="profile" className="profile-img" />
            </div>

            {open && (
              <div className="dropdown">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="content">{children}</div>

      </div>
    </div>
  );
}