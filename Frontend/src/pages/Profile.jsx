import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../assets/profilep.jpg";
import "../styles/global.css";
import { getProfileThunk } from "../redux/slices/authSlice";
import DashboardLayout from "@/components/DashboardLayout";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  MapPin,
  Camera,
  Briefcase
} from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const { token, profile, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfileThunk(token));
    }
  }, [token, profile, dispatch]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex-center" style={{ height: '70vh' }}>
          <div className="loader-glass"></div>
          <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>Syncing secure profile data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-title">
            <h2>Account Settings</h2>
            <p className="subtitle">Manage your personal information and security preferences.</p>
          </div>
        </div>

        <div className="profile-wrapper">
          {/* Side Card */}
          <div className="profile-side-card glass-card">
            <div className="profile-avatar-box">
              <img src={profilePic} alt="Profile" className="profile-img-ultra" />
              <div className="avatar-badge">
                <Camera size={20} />
              </div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
              {profile?.name || "Professor Khushbu"}
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '15px', fontWeight: '600', marginBottom: '25px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#10b981" /> Administrator
              </span>
            </p>

            <div className="user-stats-minimal">
              <div className="stat-unit">
                <span className="stat-count">1.3K</span>
                <span className="stat-label">Checked</span>
              </div>
              <div className="stat-unit">
                <span className="stat-count">42</span>
                <span className="stat-label">Subjects</span>
              </div>
            </div>
          </div>

          {/* Main Info Card */}
          <div className="profile-main-card glass-card">
            <div className="section-title-box">
              <User size={20} color="var(--accent-primary)" />
              <h3>Personal Information</h3>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <div className="info-value">{profile?.name || "Professor Khushbu Namdev"}</div>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <div className="info-value">{profile?.email || "khushbu@university.edu"}</div>
              </div>
              <div className="info-item">
                <span className="info-label">Role / Department</span>
                <div className="info-value">Head of Academic Evaluation</div>
              </div>
              <div className="info-item">
                <span className="info-label">Joined On</span>
                <div className="info-value">January 15, 2024</div>
              </div>
            </div>

            <div className="section-title-box" style={{ marginTop: '40px' }}>
              <Briefcase size={20} color="var(--accent-secondary)" />
              <h3>Professional Profile</h3>
            </div>
            <p className="bio-text">
              Dedicated educator with 8+ years of experience in higher education. Currently specializing
              in AI-assisted examination systems and modern curriculum design. Spearheading the
              Digital Copy Checking initiative for the 2026 Academic Session.
            </p>

            <button className="add-btn" style={{ marginTop: '30px', width: 'fit-content' }}>
              Edit Profile Details
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .section-title-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 15px;
        }
        .section-title-box h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        .user-stats-minimal {
          display: flex;
          justify-content: space-around;
          background: rgba(255, 255, 255, 0.03);
          padding: 20px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }
        .stat-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-count {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
        }
        .stat-label {
          font-size: 12px;
          color: var(--text-dim);
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 4px;
        }
        .bio-text {
          color: var(--text-dim);
          line-height: 1.8;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.02);
          padding: 20px;
          border-radius: 18px;
          border-left: 4px solid var(--accent-secondary);
        }
        .flex-center {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
        }
        .loader-glass {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(99, 102, 241, 0.1);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </DashboardLayout>
  );
}