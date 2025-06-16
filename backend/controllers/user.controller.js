import User from '../models/user.model.js';
import Course from '../models/course.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ firstName, lastName, email, password, username });
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user with username/email and password
export const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie('token');  // Assuming you store token in a cookie
  res.json({ message: 'Logged out successfully' });
};

// Add course to wishlist
export const addToWishlist = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.wishlist.includes(courseId)) {
      return res.status(400).json({ message: 'Course already in wishlist' });
    }

    user.wishlist.push(courseId);
    await user.save();
    res.status(200).json({ message: 'Course added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll in a course
export const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();
    res.status(200).json({ message: 'Successfully enrolled in the course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order history of a user
export const getOrderHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('orderHistory.course');
    res.json(user.orderHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { firstName, lastName, email, username, phone, bio, profilePic, coverPic } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;
    if (coverPic) user.coverPic = coverPic;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Give a review and rating for a course
export const giveReview = async (req, res) => {
  const { courseId, rating, comment } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    const existingReview = user.reviews.find(r => r.course.toString() === courseId);

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.updatedAt = Date.now();
    } else {
      user.reviews.push({ course: courseId, rating, comment });
    }

    await user.save();
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};