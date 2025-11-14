import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return this.provider === "google";
    },
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  isComplete: {
    type: Boolean,
    default: function () {
      return this.provider === "local"; // local users are always complete
    },
  },
  gender: {
    type: String,
    required: function () {
      return this.isComplete;
    },
  },
  mobile: {
    type: Number,
    unique: true,
    required: function () {
      return this.isComplete;
    },
  },
  state: {
    type: String,
    required: function () {
      return this.isComplete;
    },
  },
  country: {
    type: String,
    required: function () {
      return this.isComplete;
    },
  },
  otp: { type: String },
  otp_expiry: { type: Date },
  schemes_applied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'schemeApplied',
    },
  ],
  grievances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'grievances',
    },
  ],
  role: {
    type: String,
    enum: ['user', 'employee', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true
})

const userModel = mongoose.model("User", userSchema) || mongoose.model("User")

export default userModel