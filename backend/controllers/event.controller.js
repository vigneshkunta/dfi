import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createEvent = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser || !currentUser.isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin users can publish events"));
  }

  const newEvent = new Event({ ...req.body, user: currentUser._id });
  await newEvent.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Event created successfully", newEvent));
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json(new ApiError(404, "Event not found"));

  if (
    event.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(new ApiResponse(200, updatedEvent));
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event)
    return res.status(404).json(new ApiResponse(404, "Event not found"));

  if (
    event.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  await Event.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, "Event deleted successfully"));
});

export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(new ApiResponse(200, events));
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event)
    return res.status(404).json(new ApiResponse(404, "Event not found"));

  res.status(200).json(new ApiResponse(200, event));
});
