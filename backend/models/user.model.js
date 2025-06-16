import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/.test(value),
        message: 'Invalid email format'
      }
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[0-9]{10}$/.test(value),
        message: 'Invalid phone number format'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profilePic: {
      type: String,
      default: ''
    },
    coverPic: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    occupation: {
      type: String,
      default: ''
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    activeCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    completedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    reviews: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: 'Course'
        },
        rating: {
          type: Number,
          min: 1,
          max: 5
        },
        comment: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    orderHistory: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: 'Course'
        },
        purchasedAt: {
          type: Date,
          default: Date.now
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    shoppingCart: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: 'Course'
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    socialLinks: {
      facebook: {
        type: String,
        default: ''
      },
      twitter: {
        type: String,
        default: ''
      },
      linkedin: {
        type: String,
        default: ''
      },
      website: {
        type: String,
        default: ''
      },
      github: {
        type: String,
        default: ''
      },
      instagram: {
        type: String,
        default: ''
      },
      youtube: {
        type: String,
        default: ''
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
