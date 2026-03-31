import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Syllabus from "../pages/syllabus/Syllabus";
import QuestionPaper from "../pages/question/QuestionPaper";
import DashboardLayout from "../components/DashboardLayout";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
  path="/profile"
  element={
    <DashboardLayout>
      <Profile />
    </DashboardLayout>
  }
/>

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