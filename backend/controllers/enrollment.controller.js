import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const course = await Course.findById(courseId);
  if (!course || !course.isPublished) {
    return res.status(404).json({ message: "Course not found" });
  }

  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId,
  });

  res.status(201).json({
    success: true,
    enrollment,
  });
};
