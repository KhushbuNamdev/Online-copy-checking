import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchClasses = async () => {
  const res = await axios.get(`${API}/classes`);
  return res.data;
};
