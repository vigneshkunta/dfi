import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCourse = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser || !currentUser.isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin users can publish Courses"));
  }

  const newCourse = new Course({ ...req.body, teacher: currentUser._id });
  await newCourse.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Course created successfully", newCourse));
});

export const updateCourse = asyncHandler(async (req, res) => {
  const Course = await Course.findById(req.params.id);
  if (!Course)
    return res.status(404).json(new ApiError(404, "Course not found"));

  if (
    Course.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, updatedCourse));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const Course = await Course.findById(req.params.id);
  if (!Course)
    return res.status(404).json(new ApiResponse(404, "Course not found"));

  if (
    Course.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, "Course deleted successfully"));
});

export const getCourses = asyncHandler(async (req, res) => {
  const Courses = await Course.find();
  res.status(200).json(new ApiResponse(200, Courses));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const Course = await Course.findById(req.params.id);
  if (!Course)
    return res.status(404).json(new ApiResponse(404, "Course not found"));

  res.status(200).json(new ApiResponse(200, Course));
});
