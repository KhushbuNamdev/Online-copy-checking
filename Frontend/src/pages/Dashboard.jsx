import DashboardLayout from "@/components/DashboardLayout";
import { 
  FileCheck, 
  GraduationCap, 
  Library, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Play,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Papers Checked", value: "1,284", icon: <FileCheck size={24} />, trend: "+12%", color: "var(--accent-primary)" },
    { label: "Active Students", value: "856", icon: <GraduationCap size={24} />, trend: "+5%", color: "var(--accent-secondary)" },
    { label: "Syllabus Uploaded", value: "42", icon: <Library size={24} />, trend: "0%", color: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
    { label: "Pending Reviews", value: "18", icon: <Clock size={24} />, trend: "-3%", color: "linear-gradient(135deg, #f87171, #ef4444)" },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        {/* Hero Section */}
        <div className="hero-section glass-card">
          <div className="hero-text">
            <h1>Welcome back, <span className="highlight">Prof. Khushbu</span> 👋</h1>
            <p>Your innovative AI-powered copy checking workspace is ready. You have 12 papers waiting for review today.</p>
            <div className="hero-actions">
              <button className="add-btn">
                <Play size={18} fill="currentColor" /> Start Checking
              </button>
              <button className="secondary-btn">View Reports</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="abstract-shape"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card glass-card">
              <div className="stat-header">
                <span className="stat-icon" style={{ background: stat.color }}>{stat.icon}</span>
                <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : stat.trend === '0%' ? 'neutral' : 'down'}`}>
                  {stat.trend.startsWith('+') ? <TrendingUp size={12} /> : stat.trend.startsWith('-') ? <TrendingDown size={12} /> : null}
                  {stat.trend}
                </span>
              </div>
              <div className="stat-body">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts/Activity Placeholder Area */}
        <div className="activity-section">
          <div className="activity-card glass-card">
             <div className="section-header">
                <h3>Recent Activity</h3>
                <button className="text-btn">View All <ArrowRight size={14} /></button>
             </div>
             <ul className="activity-list">
                <li className="activity-item">
                   <div className="activity-dot"></div>
                   <div className="activity-info">
                      <p className="activity-title">Mathematics Grade 10 Paper Uploaded</p>
                      <p className="activity-time">2 hours ago</p>
                   </div>
                </li>
                <li className="activity-item">
                   <div className="activity-dot"></div>
                   <div className="activity-info">
                      <p className="activity-title">Physics Syllabus Updated</p>
                      <p className="activity-time">5 hours ago</p>
                   </div>
                </li>
                <li className="activity-item">
                   <div className="activity-dot"></div>
                   <div className="activity-info">
                      <p className="activity-title">Checked 15 English Literature Essays</p>
                      <p className="activity-time">Yesterday</p>
                   </div>
                </li>
             </ul>
          </div>
          <div className="activity-card glass-card">
             <h3>Quick Schedule</h3>
             <div className="calendar-placeholder">
                <Clock size={40} opacity={0.2} />
                <p>No meetings scheduled for today.</p>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
          padding-bottom: 20px;
        }

        .hero-section {
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-text h1 {
          font-size: 36px;
          margin: 0 0 10px 0;
          font-weight: 800;
        }

        .highlight {
          background: var(--accent-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          color: var(--text-dim);
          font-size: 18px;
          max-width: 500px;
          margin-bottom: 30px;
        }

        .hero-actions {
          display: flex;
          gap: 15px;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 12px 24px;
          border-radius: 14px;
          color: var(--text-main);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .stat-card {
          padding: 25px;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .stat-trend {
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-trend.up { color: #10b981; }
        .stat-trend.down { color: #f87171; }
        .stat-trend.neutral { color: var(--text-dim); }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
        }

        .stat-label {
          color: var(--text-dim);
          font-size: 14px;
          margin: 5px 0 0 0;
        }

        .activity-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .activity-card {
          padding: 25px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .text-btn {
          background: transparent;
          border: none;
          color: var(--accent-secondary);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .activity-card h3 {
          margin: 0;
          font-size: 20px;
        }

        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .activity-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          position: relative;
        }

        .activity-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-secondary);
          margin-top: 5px;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .activity-info p {
          margin: 0;
        }

        .activity-title {
          font-weight: 600;
          font-size: 15px;
        }

        .activity-time {
          font-size: 12px;
          color: var(--text-dim);
          margin-top: 4px;
        }

        .calendar-placeholder {
          height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          border: 1px dashed var(--glass-border);
          border-radius: 15px;
          gap: 10px;
        }
      `}</style>
    </DashboardLayout>
  );
}