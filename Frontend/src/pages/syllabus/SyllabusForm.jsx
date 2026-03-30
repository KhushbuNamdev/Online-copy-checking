import { useState, useRef } from "react";

export default function SyllabusForm({ onSubmit, onClose }) {
  const dateRef = useRef();

  const [form, setForm] = useState({
    className: "",
    subject: "",
    content: "",
    date: "",
  });

  const subjectsByClass = {
    1: ["English", "Math", "EVS"],
    2: ["English", "Math", "EVS"],
    3: ["English", "Math", "EVS", "GK"],
    4: ["English", "Math", "EVS", "Computer"],
    5: ["English", "Math", "Science", "Social Science", "Computer"],
    6: ["English", "Math", "Science", "Social Science", "Sanskrit"],
    7: ["English", "Math", "Science", "Social Science", "Sanskrit"],
    8: ["English", "Math", "Science", "Social Science", "Sanskrit"],
    9: ["English", "Math", "Physics", "Chemistry", "Biology", "IT"],
    10: ["English", "Math", "Science", "Social Science", "IT"],
    11: ["Physics","Chemistry","Math","Biology","Accounts","Business Studies","Economics","Computer Science"],
    12: ["Physics","Chemistry","Math","Biology","Accounts","Business Studies","Economics","Computer Science"],
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.className || !form.subject || !form.content || !form.date) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(form);  // send data to parent
    setForm({ className: "", subject: "", content: "", date: "" }); // reset form
    onClose(); // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Syllabus</h3>
        <form onSubmit={handleSubmit} className="form">

          <select name="className" value={form.className} onChange={handleChange} className="input-field">
            <option value="">Select Class</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i+1}>Class {i+1}</option>
            ))}
          </select>

          <select name="subject" value={form.subject} onChange={handleChange} className="input-field" disabled={!form.className}>
            <option value="">Select Subject</option>
            {subjectsByClass[form.className]?.map((sub, i) => (<option key={i}>{sub}</option>))}
          </select>

          <input type="text" name="content" placeholder="Content" value={form.content} onChange={handleChange} className="input-field" />

          <div className="date-wrapper">
            <input type="date" name="date" ref={dateRef} value={form.date} onChange={handleChange} className="input-field" />
          </div>
           <div className="form-buttons">
  <button type="submit" className="submit-btn">Submit</button>
  <button type="button" className="cancel-btn" onClick={onClose}>
    Cancel
  </button>
</div>
         
        </form>
      </div>
    </div>
  );
}