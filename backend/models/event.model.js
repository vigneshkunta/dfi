import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['Starting soon', 'Ongoing', 'Expired'],
      default: 'Starting soon',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    ticketsPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

eventSchema.virtual('fullLocation').get(function () {
  return `${this.location.city}, ${this.location.country}`;
});

eventSchema.methods.hasStarted = function () {
  return new Date() >= this.startDate;
};

eventSchema.methods.hasEnded = function () {
  return new Date() >= this.endDate;
};

eventSchema.methods.updateState = function () {
  const currentDate = new Date();
  if (currentDate < this.startDate) {
    this.state = 'Starting soon';
  } else if (currentDate >= this.startDate && currentDate <= this.endDate) {
    this.state = 'Ongoing';
  } else {
    this.state = 'Expired';
  }
  return this.save();
};

export const Event = mongoose.model('Event', eventSchema);