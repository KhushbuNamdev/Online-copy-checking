import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Syllabus from "../pages/syllabus/Syllabus";
import QuestionPaper from "../pages/question/QuestionPaper";
import Profile from "../pages/Profile";
import History from "../pages/History";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* All these components now internally use DashboardLayout for better control */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/question-paper" element={<QuestionPaper />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}