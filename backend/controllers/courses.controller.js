import Course from "../models/Course.js";   

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      _id: id,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    console.error("Get course by id error:", error);
    res.status(500).json({
      success: false,
      message: "Invalid course ID"
    });
  }
};


export const createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, description and price are required"
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      instructor: req.user.id 
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully (draft)",
      course
    });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const publishCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.isPublished = true;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course published successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
