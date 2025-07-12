import { License } from "../models/license.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createLicense = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser || !currentUser.isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin users can publish licenses"));
  }

  const newLicense = new License({ ...req.body, user: currentUser._id });
  await newLicense.save();

  res
    .status(201)
    .json(new ApiResponse(201, "License created successfully", newLicense));
});

export const updateLicense = asyncHandler(async (req, res) => {
  const license = await License.findById(req.params.id);
  if (!license)
    return res.status(404).json(new ApiError(404, "License not found"));

  if (
    license.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  const updatedLicense = await license.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, updatedLicense));
});

export const deleteLicense = asyncHandler(async (req, res) => {
  const license = await License.findById(req.params.id);
  if (!license)
    return res.status(404).json(new ApiError(404, "License not found"));

  if (
    license.user.toString() !== req.user._id.toString() &&
    !req.user.isSuperAdmin
  ) {
    return res.status(403).json(new ApiError(403, "Unauthorized"));
  }

  await license.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, "License deleted successfully"));
});

export const getLicenses = asyncHandler(async (req, res) => {
  const licenses = await License.find();
  res.status(200).json(new ApiResponse(200, licenses));
});

export const getLicenseById = asyncHandler(async (req, res) => {
  const license = await License.findById(req.params.id);
  if (!license)
    return res.status(404).json(new ApiError(404, "License not found"));

  res.status(200).json(new ApiResponse(200, license));
});
