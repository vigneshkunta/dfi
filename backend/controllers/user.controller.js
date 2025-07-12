import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json(new ApiResponse(200, newUser, "Signup successful"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  user.cleanExpiredItems();
  await user.save();

  const accessToken = user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user, "Login successful"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized: User ID not found"));
  }

  try {
    const updates = req.body;

    if (updates.phone === "") {
      delete updates.phone;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); 
  res.json(new ApiResponse(200, users, "Fetched all users"));
});

export const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized: User ID not found"));
  }

  const user = await User.findById(userId).select("-password");
  res.json(new ApiResponse(200, user, "Fetched current user"));
});
