import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration : {
      type: Number,  // Duration in number of days
      required: true,
    },
    instructors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    about: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
    },
    certificate: {
      type: Boolean,
      required: true,
      default: false,
    },
    noOfStudentsEnrolled: {
      type: Number,
      default: 0,
    },
    lessons: [
      {
        type: String,
      },
    ]
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
