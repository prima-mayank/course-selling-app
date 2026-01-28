import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AddLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // 🔒 hard block: lecture cannot exist without course
  if (!courseId) {
    return <p>Invalid access. Course not selected.</p>;
  }

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post(`/lectures?courseId=${courseId}`, {
        title,
        videoUrl,
        order,
      });

      setSuccess("Lecture added successfully");

      // reset form
      setTitle("");
      setVideoUrl("");
      setOrder(order + 1);
    } catch (err) {
      setError("Failed to add lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Lecture</h2>

      <p>
        <b>Course ID:</b> {courseId}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Lecture"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ marginLeft: 10 }}
        >
          Back
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddLecture;
