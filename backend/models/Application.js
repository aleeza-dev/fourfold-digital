
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 30,
    },

    education: {
      type: String,
      required: [true, "Education is required"],
      trim: true,
      maxlength: 200,
    },

    internship: {
      type: String,
      required: [true, "Internship role is required"],
      trim: true,
      maxlength: 100,
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    portfolio: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    motivation: {
      type: String,
      required: [true, "Motivation is required"],
      trim: true,
      maxlength: 3000,
    },

    unpaidInternshipConsent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "Applicant must acknowledge the unpaid internship terms",
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Shortlisted", "Rejected", "Accepted"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
