import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const LearnCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndLectures = async () => {
      try {
        // 1️⃣ fetch course
        const courseRes = await axios.get(`/courses/${courseId}`);
        setCourse(courseRes.data.course);

        // 2️⃣ fetch lectures
        const lectureRes = await axios.get(
          `/lectures?courseId=${courseId}`
        );

        const lectureList = lectureRes.data.lectures || [];
        // sort by order (IMPORTANT)
        lectureList.sort((a, b) => a.order - b.order);

        setLectures(lectureList);
        setActiveLecture(lectureList[0] || null);
      } catch (err) {
        setError("Unable to load course or lectures");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndLectures();
  }, [courseId]);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT: Lecture List */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ddd",
          padding: "16px",
          overflowY: "auto",
        }}
      >
        <h3>{course.title}</h3>
        <hr />

        {lectures.length === 0 && <p>No lectures available.</p>}

        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            onClick={() => setActiveLecture(lecture)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              cursor: "pointer",
              background:
                activeLecture?._id === lecture._id
                  ? "#f0f0f0"
                  : "transparent",
            }}
          >
            {lecture.order}. {lecture.title}
          </div>
        ))}
      </div>

      {/* RIGHT: Video Player */}
      <div style={{ width: "70%", padding: "20px" }}>
        {activeLecture ? (
          <>
            <h2>{activeLecture.title}</h2>

            <video
              key={activeLecture._id}
              src={activeLecture.videoUrl}
              controls
              width="100%"
              style={{ maxHeight: "70vh" }}
            />

          </>
        ) : (
          <p>Select a lecture to start learning.</p>
        )}
      </div>
    </div>
  );
};

export default LearnCourse;
