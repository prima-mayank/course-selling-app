import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course._id}`)}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "6px",
        marginBottom: "12px",
        cursor: "pointer",
      }}
    >
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>
        <b>Price:</b> ₹{course.price}
      </p>
    </div>
  );
};

export default CourseCard;
