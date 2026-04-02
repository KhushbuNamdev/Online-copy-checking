import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  History as HistoryIcon,
  Settings as SettingsIcon,
  LogOut,
  User,
  Zap,
  HelpCircle,
  Sun,
  Moon,
  Search
} from "lucide-react";
import "../styles/global.css";
import { getProfileThunk, logout } from "../redux/slices/authSlice";
import { useTheme } from "../context/ThemeContext";

// assets
import profilePic from "../assets/profile_refined.png";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const { token, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfileThunk(token));
    }
  }, [token, profile, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Syllabus", path: "/syllabus", icon: <BookOpen size={20} /> },
    { name: "Question Paper", path: "/question-paper", icon: <FileText size={20} /> },
    { name: "History", path: "/history", icon: <HistoryIcon size={20} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div className="dashboard">
      <div className="liquid-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo-container-sidebar">
            <div className="logo-glow-sidebar"></div>
            <div className="logo-icon-box-sidebar">
              <FileText size={24} color="#fff" strokeWidth={1.5} />
              <Search size={16} color="#0cebeb" className="search-lens-icon-sidebar" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="brand-name">CopyChecker</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${window.location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-link theme-toggle" onClick={toggleTheme}>
            <span className="icon-wrapper">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </span>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="navbar">
          <div className="navbar-left">
            <h3>Overview</h3>
          </div>

          <div className="navbar-right">
            <div className="profile-box" ref={dropdownRef}>
              <div className="user" onClick={() => setOpen(!open)}>
                <div className="user-info">
                  <span className="user-name">{profile?.name || "User"}</span>
                  <span className="user-role">{profile?.isAdmin ? "Administrator" : "Professor"}</span>
                </div>
                <div className="profile-img-wrapper">
                  <img src={profilePic} alt="profile" className="profile-img" />
                  <div className="online-indicator"></div>
                </div>
              </div>

              {open && (
                <div className="nav-profile-card premium-glass-dropdown">
                  <div className="dropdown-header">
                    <img src={profilePic} alt="Profile" className="dropdown-avatar" />
                    <div className="dropdown-user-info">
                      <span className="dropdown-name">{profile?.name || "Faculty Member"}</span>
                      <span className="dropdown-email">{profile?.email || "syncing email..."}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-body">
                    <Link to="/profile" className="dropdown-item" onClick={() => setOpen(false)}>
                      <User size={16} className="dropdown-icon primary" />
                      View Profile
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      <LogOut size={16} className="dropdown-icon danger" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="content">
          {children}
        </section>
      </main>

      <style>{`
        .navbar {
          position: relative;
          z-index: 9999;
        }
        .profile-box {
          position: relative;
        }
        .premium-glass-dropdown {
          position: absolute;
          top: calc(100% + 15px);
          right: 0;
          width: 280px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
          z-index: 99999;
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
        }

        .dropdown-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(99, 102, 241, 0.5);
          object-fit: cover;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }

        .dropdown-user-info {
          display: flex;
          flex-direction: column;
        }

        .dropdown-name {
          font-weight: 600;
          color: white;
          font-size: 15px;
          letter-spacing: 0.3px;
        }

        .dropdown-email {
          color: var(--text-dim, #94a3b8);
          font-size: 13px;
        }

        .dropdown-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 0;
        }

        .dropdown-body {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .dropdown-icon {
          opacity: 0.8;
          transition: all 0.2s ease;
        }

        .dropdown-icon.primary {
          color: #818cf8;
        }

        .dropdown-icon.danger {
          color: #f87171;
        }

        .dropdown-item:hover .dropdown-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .logout-btn {
          margin-top: 5px;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
        }

        /* Sidebar Logo Styles */
        .brand-logo-container-sidebar {
          position: relative;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }
        .logo-glow-sidebar {
          position: absolute;
          inset: -3px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 14px;
          animation: pulseGlowSidebar 3s infinite;
        }
        @keyframes pulseGlowSidebar {
          0% { transform: scale(0.98); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.98); opacity: 0.6; }
        }
        .logo-icon-box-sidebar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-lens-icon-sidebar {
          position: absolute;
          bottom: -3px;
          right: -5px;
          filter: drop-shadow(0 0 3px rgba(12, 235, 235, 0.6));
        }
      `}</style>
    </div>
  );
}