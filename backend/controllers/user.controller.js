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
