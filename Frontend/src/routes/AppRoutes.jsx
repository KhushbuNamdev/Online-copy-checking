import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Syllabus from "../pages/syllabus/Syllabus";
import QuestionPaper from "../pages/question/QuestionPaper";
import DashboardLayout from "../components/DashboardLayout";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/syllabus" element={<Syllabus />} />

      <Route
        path="/question-paper"
        element={
          <DashboardLayout>
            <QuestionPaper />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}