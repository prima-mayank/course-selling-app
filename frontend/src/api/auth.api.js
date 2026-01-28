import API from "./axios";

export const loginUser = async (formData) => {
  const res = await API.post("/users/login", formData);
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await API.post("/users/register", formData);
    
  return res.data;
};

export const getMe = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  setUser(null);
};
