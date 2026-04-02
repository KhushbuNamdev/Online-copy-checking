import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { 
  Search, 
  FileText, 
  User, 
  Eye, 
  Trash2, 
  Calendar,
  AlertCircle
} from "lucide-react";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function History() {
  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      file: "Assignment_1_Data_Structures.pdf",
      student: "Riddhi Sharma",
      class: "10th A",
      subject: "Computer Science",
      percentage: 32,
      date: "Apr 02, 2026",
    },
    {
      id: 2,
      file: "History_Essay_Industrial_Revolution.docx",
      student: "Rahul Verma",
      class: "12th B",
      subject: "History",
      percentage: 78,
      date: "Apr 01, 2026",
    },
    {
      id: 3,
      file: "Calculus_Final_Report.pdf",
      student: "Aditi Singh",
      class: "11th C",
      subject: "Mathematics",
      percentage: 12,
      date: "Mar 30, 2026",
    },
    {
      id: 4,
      file: "Organic_Chemistry_Synthesis.pdf",
      student: "Vikram Malhotra",
      class: "12th A",
      subject: "Chemistry",
      percentage: 55,
      date: "Mar 28, 2026",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.file.toLowerCase().includes(search.toLowerCase()) ||
      item.student.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (pct) => {
    if (pct > 60) return <span className="status-badge high">High Risk</span>;
    if (pct > 30) return <span className="status-badge medium">Caution</span>;
    return <span className="status-badge low">Minimal</span>;
  };

  return (
    <DashboardLayout>
      <div className="history-page-wrapper">
        <style>{`
          .history-header {
            margin-bottom: 30px;
          }
          .history-controls {
            margin-bottom: 25px;
            max-width: 450px;
          }
          .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .status-badge.high {
            background: rgba(239, 68, 68, 0.1);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.2);
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.1);
          }
          .status-badge.medium {
            background: rgba(245, 158, 11, 0.1);
            color: #fbbf24;
            border: 1px solid rgba(245, 158, 11, 0.2);
          }
          .status-badge.low {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          .percentage-text {
            font-weight: 800;
            margin-right: 10px;
            font-size: 15px;
          }
          .action-flex {
            display: flex;
            gap: 10px;
          }
          .file-name-cell {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #818cf8;
            font-weight: 600;
          }
          .student-cell {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
          }
        `}</style>

        <div className="history-header">
           <div className="header-title">
            <h2>Analysis History</h2>
            <p className="subtitle">Review and manage past plagiarism detection reports.</p>
          </div>
        </div>

        <div className="history-controls">
          <Input
            placeholder="Search by student or file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={18} />}
            className="glass-search"
          />
        </div>

        <Table headers={["File Analyzed", "Student", "Subject", "Detection Score", "Date", "Actions"]}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="file-name-cell">
                    <FileText size={16} />
                    {item.file}
                  </div>
                </td>
                <td>
                  <div className="student-cell">
                    <User size={16} className="text-dim" />
                    {item.student}
                  </div>
                </td>
                <td className="text-dim">{item.subject} <span style={{ fontSize: '12px' }}>({item.class})</span></td>
                <td>
                  <span className="percentage-text">{item.percentage}%</span>
                  {getStatusBadge(item.percentage)}
                </td>
                <td className="text-dim">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </td>
                <td>
                  <div className="action-flex">
                    <Button variant="secondary" title="View Report" style={{ padding: '8px' }}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="danger" title="Delete record" style={{ padding: '8px' }}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                  <AlertCircle size={40} style={{ marginBottom: '15px', opacity: 0.2 }} />
                  <p>No matching history records found.</p>
                </div>
              </td>
            </tr>
          )}
        </Table>
      </div>
    </DashboardLayout>
  );
}