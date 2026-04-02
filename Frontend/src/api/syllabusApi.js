import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ✅ Upload syllabus
export const uploadSyllabus = async (formData, token) => {
  const res = await axios.post(`${API}/syllabus`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ✅ Get syllabus
export const fetchSyllabus = async () => {
  const res = await axios.get(`${API}/syllabus`);
  return res.data;
};

