import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuth, isAdmin } = useAuth();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const courseRes = await axios.get(`/courses/${courseId}`);
        setCourse(courseRes.data.course);

        const lecRes = await axios.get(`/lectures?courseId=${courseId}`);
        setLectures(lecRes.data.lectures || []);
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>₹{course.price}</p>

      {/* ================= ADMIN ACTIONS ================= */}
      {isAdmin && (
        <>
          {!course.isPublished ? (
            <button
              onClick={async () => {
                await axios.patch(`/courses/publish/${courseId}`);
                setCourse({ ...course, isPublished: true });
              }}
            >
              Publish Course
            </button>
          ) : (
            <p style={{ color: "green" }}>Course is published</p>
          )}
          <hr />
        </>
      )}

      {/* ================= STUDENT VIEW ================= */}
      {!isAdmin && (
        <>
          {!course.isPublished ? (
            <p>This course is not published yet.</p>
          ) : (
            <>
              <h3>Lectures</h3>

              {lectures.length === 0 && <p>No lectures yet.</p>}

              {lectures.map((lec, i) => (
                <div key={lec._id}>
                  {i + 1}. {lec.title}
                </div>
              ))}

              <br />

              {!isAuth ? (
                <button onClick={() => navigate("/login")}>
                  Login to Enroll
                </button>
              ) : (
                <button onClick={() => navigate(`/learn/${courseId}`)}>
                  Go to Course
                </button>
              )}
            </>
          )}
        </>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {isAdmin && (
        <>
          <h3>Manage Lectures</h3>

          <button
            onClick={() =>
              navigate(`/admin/courses/${courseId}/lectures`)
            }
          >
            Add Lecture
          </button>

          <ul>
            {lectures.map((lec) => (
              <li key={lec._id} style={{ marginBottom: 8 }}>
                {lec.title}{" "}
                <button
                  onClick={async () => {
                    const ok = window.confirm(
                      "Delete this lecture?"
                    );
                    if (!ok) return;

                    await axios.delete(
                      `/lectures?lectureId=${lec._id}`
                    );

                    setLectures(
                      lectures.filter(
                        (l) => l._id !== lec._id
                      )
                    );
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
