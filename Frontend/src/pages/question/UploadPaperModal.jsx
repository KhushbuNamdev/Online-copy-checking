import React, { useState } from "react";
import "../../styles/global.css";
import {
  Upload,
  CheckCircle,
  Search
} from "lucide-react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

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
    examType: "",
    year: new Date().getFullYear().toString(),
    marks: "",
    duration: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
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
    <Modal
      onClose={onClose}
      className="paper-modal-box"
    >
      <div className="paper-custom-header">
        <div className="icon-badge"><Search size={24} color="#06b6d4" /></div>
        <h2>Upload Exam Asset</h2>
        <p>Onboard new examination papers for AI evaluation.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-glass">
        <div className="form-grid">
          <Select
            label="Academic Class"
            name="className"
            value={form.className}
            onChange={handleChange}
            placeholder="Select Grade"
            required
            options={[...Array(12)].map((_, i) => ({
              value: String(i + 1),
              label: `Grade ${i + 1}`
            }))}
          />

          <Select
            label="Subject Label"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Select Domain"
            required
            disabled={!form.className}
            options={subjectsByClass[form.className] || []}
          />

          <Select
            label="Exam Category"
            name="examType"
            value={form.examType}
            onChange={handleChange}
            placeholder="Select Type"
            required
            options={["Unit Test", "Half Yearly", "Annual"]}
          />

          <Input
            label="Academic Year"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
            placeholder="2026"
            required
          />

          <Select
            label="Total Marks"
            name="marks"
            value={form.marks}
            onChange={handleChange}
            placeholder="Select Marks"
            required
            options={[
              { value: "20", label: "20 Marks" },
              { value: "50", label: "50 Marks" },
              { value: "80", label: "80 Marks" },
              { value: "100", label: "100 Marks" }
            ]}
          />

          <Select
            label="Exam Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Select Duration"
            required
            options={[
              { value: "30 mins", label: "30 Minutes" },
              { value: "1 hour", label: "1 Hour" },
              { value: "2 hours", label: "2 Hours" },
              { value: "3 hours", label: "3 Hours" }
            ]}
          />
        </div>

        <div className="input-group">
          <label>Question Paper Document (PDF)</label>
          <div className="file-upload-wrapper-glass scanning-effect">
            <input
              type="file"
              onChange={handleFileChange}
              required
              id="paper-file-ultra"
              className="input-field-glass hidden-file-input"
            />
            <label htmlFor="paper-file-ultra" className="file-drop-area-glass">
              <Upload size={18} />
              <span>{form.file ? form.file.name : "Securely upload exam file..."}</span>
            </label>
          </div>
        </div>

        <div className="form-buttons">
          <Button 
            type="submit" 
            shimmer 
            style={{ background: 'var(--accent-secondary)' }}
          >
            <CheckCircle size={18} /> Save Assessment
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>

      <style>{`
        .paper-modal-box {
          width: 580px;
          padding: 0;
          overflow: hidden;
        }
        .paper-custom-header {
          padding: 30px 40px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .paper-custom-header .icon-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
        }
        .paper-custom-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .paper-custom-header p {
          color: var(--text-dim);
          font-size: 14px;
        }
        .form-glass {
          padding: 20px 40px 40px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          width: 100%;
          margin-bottom: 20px;
        }
        .hidden-file-input { display: none; }
        .file-drop-area-glass {
           display: flex;
           align-items: center;
           gap: 12px;
           background: rgba(255, 255, 255, 0.03);
           border: 1px dashed rgba(255, 255, 255, 0.2);
           border-radius: 16px;
           padding: 18px;
           cursor: pointer;
           transition: all 0.3s ease;
           color: var(--text-dim);
           font-size: 14px;
           width: 100%;
        }
        .file-drop-area-glass:hover {
           background: rgba(6, 182, 212, 0.05);
           border-color: #06b6d4;
           color: #fff;
        }
        .form-buttons {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }
        .form-buttons button {
           flex: 1;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
        }
      `}</style>
    </Modal>
  );
}