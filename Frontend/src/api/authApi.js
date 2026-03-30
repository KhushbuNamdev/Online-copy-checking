import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (data) => {
  const response = await axios.post(`${API}/api/users/login`, data);
  return response.data;
};