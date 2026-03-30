import { Link } from "react-router-dom";
import "../styles/global.css";

// Import all icons
import dashboardIcon from "../assets/dashboard.png";
import syllabusIcon from "../assets/syllabus.png";
import questionIcon from "../assets/question.png";
import historyIcon from "../assets/history.png";
import settingsIcon from "../assets/settings.png";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>✔️CopyChecker</h2>
        <ul>

          <li>
            <Link to="/dashboard" className="nav-link">
              <img src={dashboardIcon} alt="Dashboard" className="menu-icon" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/syllabus" className="nav-link">
              <img src={syllabusIcon}  alt="Syllabus" className="menu-icon" />
              Syllabus
            </Link>
          </li>

          <li>
            <Link to="/question-paper" className="nav-link">
  <img src={questionIcon} alt="Question Paper" className="menu-icon" />
  Question Paper
</Link>
          </li>

          <li>
            <Link to="/history" className="nav-link">
              <img src={historyIcon} alt="History" className="menu-icon" />
              History
            </Link>
          </li>

          <li>
            <Link to="/settings" className="nav-link">
              <img src={settingsIcon} alt="Settings" className="menu-icon" />
              Settings
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Area */}
      <div className="main">
        <div className="navbar">
          <h3>Dashboard</h3>
          <div className="user">👤 User</div>
        </div>

        <div className="content">{children}</div>
      </div>

    </div>
  );
}