
const mongoose = require("mongoose");

const projectInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 254,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 140,
      default: "",
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    budget: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    details: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProjectInquiry",
  projectInquirySchema
);
