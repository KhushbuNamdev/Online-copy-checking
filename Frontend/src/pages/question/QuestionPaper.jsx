import React, { useState } from "react";
import "../../styles/global.css";
import UploadPaperModal from "./UploadPaperModal";

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
    <div className="qp-container">
      <div className="qp-header">
        <h2>Question Paper Management</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>
          + Upload Paper
        </button>
      </div>

      <div className="table-wrapper">
        <table className="qp-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Exam Type</th>
              <th>Year</th>
              <th>Marks</th>
              <th>Duration</th>
              <th>File</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {papers.length > 0 ? (
              papers.map((p) => (
                <tr key={p.id}>
                  <td>{p.className}th Class</td>
                  <td>{p.subject}</td>
                  <td>{p.examType}</td>
                  <td>{p.year}</td>
                  <td>{p.marks}</td>
                  <td>{p.duration}</td>
                  <td className="file-link">
                    {/* Display file name instead of the object */}
                    {p.file?.name || "No File"}
                  </td>
                  <td>{p.createdAt}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                  No question papers uploaded yet. Click "+ Upload Paper" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <UploadPaperModal
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}