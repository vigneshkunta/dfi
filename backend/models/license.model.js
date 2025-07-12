import mongoose from 'mongoose';
const { Schema } = mongoose;

const licenseSchema = new Schema(
  {
    license_name: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0 
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      enum : ["year", "month","half-year","quarter","lifetime"],
    },
  },
  {
    timestamps: true 
  }
);

export const License = mongoose.model('License', licenseSchema);
