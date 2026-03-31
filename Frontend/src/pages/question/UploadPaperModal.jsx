import React, { useState } from "react";
import "../../styles/global.css";

const subjectsByClass = {
  "1": ["English", "Hindi", "Maths", "EVS"],
  "2": ["English", "Hindi", "Maths", "EVS"],
  "3": ["English", "Hindi", "Maths", "Science", "Social Studies"],
  "4": ["English", "Hindi", "Maths", "Science", "Social Studies"],
  "5": ["English", "Hindi", "Maths", "Science", "Social Studies"],
  "6": ["English", "Hindi", "Maths", "Science", "Social Science"],
  "7": ["English", "Hindi", "Maths", "Science", "Social Science"],
  "8": ["English", "Hindi", "Maths", "Science", "Social Science"],
  "9": ["English", "Hindi", "Maths", "Science", "Social Science"],
  "10": ["English", "Hindi", "Maths", "Science", "Social Science"],
  "11": ["Physics", "Chemistry", "Biology", "Maths", "English"],
  "12": ["Physics", "Chemistry", "Biology", "Maths", "English"],
};

export default function UploadPaper({ onClose, onSave }) {
  const [form, setForm] = useState({
    className: "",
    subject: "",
    examType: "Annual",
    year: new Date().getFullYear(),
    marks: 100,
    duration: "3 Hours",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,

      // reset subject when class changes
      ...(name === "className" ? { subject: "" } : {}),
    });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
  <div className="modal-overlay" onClick={onClose}>
    
    <div 
      className="modal-box"
      onClick={(e) => e.stopPropagation()}
    >

      {/* 🔥 HEADER */}
      <div className="modal-header">
        <h2>Question Paper Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">

        <select
          name="className"
          value={form.className}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {i + 1}th Class
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          disabled={!form.className}
        >
          <option value="">Select Subject</option>
          {(subjectsByClass[form.className] || []).map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <select
          name="examType"
          value={form.examType}
          onChange={handleChange}
        >
          <option value="Unit Test">Unit Test</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Annual">Annual</option>
        </select>

        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="marks"
          type="number"
          value={form.marks}
          onChange={handleChange}
        />

        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
        />

        <input type="file" onChange={handleFileChange} required />

        <div className="modal-buttons">
          <button type="submit" className="save-btn">
            Save
          </button>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
)
}