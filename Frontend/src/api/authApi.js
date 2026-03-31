// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ✅ Login API (email + password explicitly)
// export const loginUser = async ({ email, password }) => {
//   const response = await axios.post(`${API}/users/login`, {
//     email,
//     password,
//   });

//   return response.data;
// };
// export const getProfile = async (token) => {
//   const response = await axios.get(`${API}/users/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };



import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ✅ Login API
export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API}/users/login`, {
    email,
    password,
  });

  return response.data;
};

// ✅ Get Profile API
export const getProfile = async (token) => {
  const response = await axios.get(`${API}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};