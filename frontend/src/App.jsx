import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import LearnCourse from "./pages/LearnCourse";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCourse from "./pages/CreateCourse";
import AddLecture from "./pages/AddLecture";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute>
              <LearnCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute adminOnly>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses/:courseId/lectures"
          element={
            <ProtectedRoute adminOnly>
              <AddLecture />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
