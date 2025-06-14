import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  about: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    required: true
  },
  certificate: {
    type: Boolean,
    required: true,
    default: false
  },
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  noOfStudentsEnrolled: {
    type: Number,
    default: 0
  },
  lessons: [{
    videoUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
