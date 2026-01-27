


import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";

export const getLecturesByCourse = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not published",
      });
    }

    const lectures = await Lecture.find({ course: courseId })
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const addLecture = async (req, res) => {
  try {
    const { courseId } = req.query;
    const { title, videoUrl, order, isFreePreview } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    if (!title || !videoUrl || order === undefined) {
      return res.status(400).json({
        success: false,
        message: "title, videoUrl and order are required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lecture = await Lecture.create({
      title,
      videoUrl,
      order,
      isFreePreview: isFreePreview || false,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.query;

    if (!lectureId) {
      return res.status(400).json({
        success: false,
        message: "lectureId is required",
      });
    }

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    await Lecture.findByIdAndDelete(lectureId);

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

