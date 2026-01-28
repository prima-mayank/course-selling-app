import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/courses");
        // safe handling
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {/* CREATE COURSE */}
      <Link to="/admin/create-course">
        <button>Add Course</button>
      </Link>

      <h3 style={{ marginTop: 20 }}>Courses</h3>

      {/* COURSE LIST */}
      {courses.length === 0 && <p>No courses created yet.</p>}

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            marginBottom: 10,
            padding: 10,
            border: "1px solid #ddd",
          }}
        >
          <strong>{course.title}</strong>

          <div style={{ marginTop: 6 }}>
            {/* ADD LECTURE — STRICTLY COURSE BASED */}
            <Link to={`/admin/courses/${course._id}/lectures`}>
              <button>Add Lecture</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
