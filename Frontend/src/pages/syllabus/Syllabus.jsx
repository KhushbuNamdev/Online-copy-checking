import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SyllabusForm from "./SyllabusForm";

export default function Syllabus() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (formData) => setData([...data, formData]);
  const handleDelete = (index) => setData(data.filter((_, i) => i !== index));

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>About Syllabus</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add</button>
      </div>

      {/* Modal Form */}
      {showForm && <SyllabusForm onSubmit={handleAdd} onClose={() => setShowForm(false)} />}

      {/* Table with headings always visible */}
      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.className}</td>
                <td>{item.subject}</td>
                <td>{item.content}</td>
                <td>{item.date}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                No syllabus added yet. Click "Add Details" to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}