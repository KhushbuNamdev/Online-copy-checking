import React, { useState } from "react";
import "../../styles/global.css";
import UploadPaperModal from "./UploadPaperModal";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Plus, 
  FileText, 
  Trash2, 
  Eye, 
  Calendar, 
  Award,
  Clock 
} from "lucide-react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";

export default function QuestionPaper() {
  const [papers, setPapers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSave = (data) => {
    const newPaper = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPapers([...papers, newPaper]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      setPapers(papers.filter((p) => p.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <style>{`
          .page-container .table th {
            font-size: 11px;
            padding: 14px 15px;
            letter-spacing: 1px;
          }
          .page-container .table td { 
            font-size: 13px;
            padding: 12px 15px;
          }
          .action-btns { 
            display: flex; 
            gap: 6px; 
            align-items: center; 
            flex-wrap: nowrap;
          }
          .badge-glass {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--glass-border);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            color: var(--text-main);
          }
          .flex-center {
            display: flex;
            align-items: center;
          }
          .pdf-link {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            color: #818cf8;
            text-decoration: none;
            font-weight: 500;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 140px;
          }
          .pdf-link:hover { text-decoration: underline; }
        `}</style>
        {/* HEADER - Styled like Syllabus Page */}
        <div className="page-header">
          <div className="header-title">
            <h2>Question Paper Repository</h2>
            <p className="subtitle">Manage and access examination papers across all categories.</p>
          </div>
          <button className="add-btn" onClick={() => setOpen(true)}>
            <Plus size={18} /> Upload New Paper
          </button>
        </div>

        {/* TABLE WRAPPER - Consistent Glass Style */}
        <Table
          headers={[
            "Academic Class",
            "Subject Name",
            "Exam Category",
            "Academic Year",
            "Total Marks",
            "Duration",
            "Document",
            "Actions"
          ]}
        >
          {papers.length > 0 ? (
                papers.map((p) => (
                  <tr key={p.id}>
                    <td className="font-bold">Grade {p.className}</td>
                    <td>{p.subject}</td>
                    <td><span className="badge-glass">{p.examType}</span></td>
                    <td><div className="flex-center"><Calendar size={13} style={{marginRight: '6px', color: 'var(--accent-secondary)'}}/> {p.year}</div></td>
                    <td className="marks-cell"><div className="flex-center"><Award size={13} style={{marginRight: '6px', color: '#fbbf24'}}/> {p.marks}</div></td>
                    <td><div className="flex-center"><Clock size={13} style={{marginRight: '6px', color: 'var(--text-dim)'}}/> {p.duration}</div></td>
                    <td className="file-cell">
                      <div className="pdf-link">
                         <FileText size={14} /> {p.file?.name || "View PDF"}
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <Button variant="icon" className="view" onClick={() => alert("View feature coming soon")} title="View">
                          <Eye size={14} />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(p.id)} title="Delete">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <div className="empty-content">
                       <p>No question papers found.</p>
                       <span>Upload a paper to start the review process.</span>
                    </div>
                  </td>
                </tr>
              )}
          </Table>

        {open && (
          <UploadPaperModal
            onClose={() => setOpen(false)}
            onSave={handleSave}
          />
        )}
      </div>

    </DashboardLayout>
  );
}