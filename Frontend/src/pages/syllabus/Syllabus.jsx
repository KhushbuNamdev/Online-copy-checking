import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SyllabusForm from "./SyllabusForm";
import {
  uploadSyllabus,
  fetchSyllabus,
} from "../../api/syllabusApi";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";

export default function Syllabus() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadSyllabus();
  }, []);

  const loadSyllabus = async () => {
    try {
      const res = await fetchSyllabus();
      setData(res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (formData, id) => {
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("class", formData.className);
      data.append("subject", formData.subject);
      data.append("file", formData.file);

      if (id) {
        alert("Update logic would go here");
      } else {
        await uploadSyllabus(data, token);
        alert("Uploaded successfully");
      }

      loadSyllabus();
      setShowForm(false);
      setEditData(null);
    } catch (err) {
      console.log(err);
      alert("Action failed");
    }
  };

  const openEdit = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  return (
    <DashboardLayout>
      <div className="syllabus-container">
        <style>{`
          .syllabus-container .table td { 
            padding: 12px 22px; 
          }
          .action-btns { 
            display: flex; 
            gap: 8px; 
            align-items: center; 
          }
          .pdf-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #818cf8;
            text-decoration: none;
            font-weight: 500;
          }
          .pdf-link:hover {
            text-decoration: underline;
          }
        `}</style>
        {/* HEADER */}
        <div className="page-header">
          <div className="header-title">
            <h2>Curriculum Repository</h2>
            <p className="subtitle">Manage and access school syllabi across all departments.</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={18} /> Add New Syllabus
          </Button>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <SyllabusForm
            onSubmit={handleAdd}
            onClose={() => {
              setShowForm(false);
              setEditData(null);
            }}
            editData={editData}
          />
        )}

        {/* TABLE WRAPPER */}
        <Table 
          headers={["Academic Class", "Subject Name", "Document", "Upload Date", "Actions"]}
        >
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="font-bold">{item.class?.name || "N/A"}</td>
                <td>{item.subject}</td>

                <td>
                  <a
                    href={`http://localhost:5000${item.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pdf-link"
                  >
                    <ExternalLink size={14} /> View PDF
                  </a>
                </td>

                <td className="text-dim">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                     month: 'short',
                     day: 'numeric',
                     year: 'numeric'
                  })}
                </td>

                <td>
                  <div className="action-btns">
                    <Button
                      variant="icon"
                      className="edit"
                      onClick={() => openEdit(item)}
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => alert("Delete feature coming soon")}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-state">
                <div className="empty-content">
                   <p>No curriculum documents found.</p>
                   <span>Upload a syllabus to get started.</span>
                </div>
              </td>
            </tr>
          )}
        </Table>
      </div>
    </DashboardLayout>
  );
}