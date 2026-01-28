import API from "./axios";

export const getAllCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};


