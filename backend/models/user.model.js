import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (value) => /^[0-9]{10}$/.test(value),
        message: "Invalid phone number format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://image.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-260nw-2470054311.jpg",
    },
    coverPic: {
      type: String,
      default:
        "http://brosmar.com/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-2.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    enrolledCourses: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        validUntil: { type: Date },
      },
    ],
    purchasedLicenses: [
      {
        license: { type: Schema.Types.ObjectId, ref: "License" },
        validUntil: { type: Date },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
    eventTickets: [
      {
        event: { type: Schema.Types.ObjectId, ref: "Event" },
        ticketId: { type: String },
        issuedAt: { type: Date, default: Date.now },
        validUntil: { type: Date },
        ticketData: { type: String }, // could be base64 or URL or stringified HTML
      },
    ],

    paymentHistory: [
      {
        type: { type: String, enum: ["course", "license", "event"] },
        item: { type: Schema.Types.ObjectId, refPath: "paymentHistory.type" },
        amount: { type: Number },
        paidAt: { type: Date, default: Date.now },
        validUntil: { type: Date },
        receiptId: { type: String },
      },
    ],

    socialLinks: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};

userSchema.methods.cleanExpiredItems = function () {
  const now = new Date();

  this.enrolledCourses = this.enrolledCourses.filter(
    (entry) => !entry.validUntil || entry.validUntil > now
  );

  this.purchasedLicenses = this.purchasedLicenses.filter(
    (entry) => !entry.validUntil || entry.validUntil > now
  );

  this.eventTickets = this.eventTickets.filter(
    (entry) => !entry.validUntil || entry.validUntil > now
  );
};


export const User = mongoose.model("User", userSchema);
