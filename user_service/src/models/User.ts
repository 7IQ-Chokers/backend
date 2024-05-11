import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  interests: [
    {
      type: String,
      trim: true,
    },
  ],
  dateOfBirth: {
    type: Date,
    default: "2000-12-20",
  },
  isInvestor: {
    type: Boolean,
    default: false,
  },
  orgId: {
    type: String,
  },
  calendlyLink: {
    type: String,
  },
  currentOtp: {
    type: String,
    default: null,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
