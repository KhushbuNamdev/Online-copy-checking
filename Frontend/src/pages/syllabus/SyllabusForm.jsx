import { useState, useEffect } from "react";
import { fetchClasses } from "../../api/classApi";
import {
  FileText,
  CheckCircle,
  BookOpen
} from "lucide-react";
import "../../styles/global.css";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

export default function SyllabusForm({ onSubmit, onClose, editData }) {
  const [form, setForm] = useState({
    className: "",
    subject: "",
    file: null,
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const res = await fetchClasses();
      setClasses(res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editData) {
      setForm({
        className: editData.className?._id || editData.className || "",
        subject: editData.subject || "",
        file: null,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (form.className) {
      const selectedClass = classes.find((c) => c._id === form.className || c.name === form.className);
      if (selectedClass && selectedClass.subjects) {
        setSubjects(selectedClass.subjects);
      } else {
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
  }, [form.className, classes]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.className || !form.subject) {
      alert("All fields are required");
      return;
    }
    onSubmit(form, editData?._id);
  };

  return (
    <Modal
      onClose={onClose}
      className="form-modal-box"
    >
      <div className="syllabus-custom-header">
        <div className="icon-badge"><BookOpen size={24} color="#6366f1" /></div>
        <h2>{editData ? "Update Curriculum" : "New Syllabus"}</h2>
        <p>Design and deploy high-standard educational content.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-glass">
        <Select
          label="Academic Year & Class"
          name="className"
          value={form.className}
          onChange={handleChange}
          placeholder="Select Target Class"
          required
          options={classes.map((cls) => ({
            value: cls._id,
            label: cls.name
          }))}
        />

        <Select
          label="Subject Title"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder={form.className ? "Select Subject" : "Select a class first"}
          required
          disabled={!form.className}
          options={subjects}
        />

        <div className="input-group">
          <label>Curriculum Document (PDF)</label>
          <div className="file-input-wrapper-glass">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setForm({ ...form, file: e.target.files[0] })
              }
              className="input-field-glass file-input-hidden"
              id="syllabus-file"
              required={!editData}
            />
            <label htmlFor="syllabus-file" className="file-label-custom">
              <FileText size={18} />
              <span>{form.file ? form.file.name : "Choose PDF document..."}</span>
            </label>
          </div>
        </div>

        <div className="form-buttons">
          <Button 
            type="submit" 
            shimmer 
            style={{ background: 'var(--accent-primary)' }}
          >
            <CheckCircle size={18} /> Establish Syllabus
          </Button>

          <Button 
            variant="primary" 
            onClick={onClose}
            className="dismiss-glass-btn"
          >
            Dismiss
          </Button>
        </div>
      </form>

      <style>{`
        .form-modal-box {
          width: 500px;
          padding: 0;
          overflow: hidden;
        }
        .syllabus-custom-header {
          padding: 30px 40px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .syllabus-custom-header .icon-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
        }
        .syllabus-custom-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .syllabus-custom-header p {
          color: var(--text-dim);
          font-size: 14px;
        }
        .form-glass {
          padding: 20px 40px 40px;
        }
        .file-input-hidden { display: none; }
        .file-label-custom {
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
        }
        .file-label-custom:hover {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.05);
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