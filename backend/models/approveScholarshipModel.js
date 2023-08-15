const mongoose = require("mongoose");

const approveScholarshipSchema = new mongoose.Schema({
  session: {
    type: String,
    required: [true, "Enter session"],
  },
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: [true, "Enter your Department"],
  },
  semester: {
    type: Number,
    required: [true, "Enter Your Semester"],
  },
  name: {
    type: String,
    required: [true, "Enter Your Name"],
  },
  enrollmentNumber: {
    type: String,
    required: [true, "Enter Your Enrollment Number"],
  },

  state: {
    type: String,
    required: [true, "Enter state"],
  },
  district: {
    type: String,
    required: [true, "Enter district"],
  },
  dateOfSubmission: {
    type: String,
    required: [true, "Enter date"],
  },
  scholarship: {
    type: String,
    required: [true, "Enter name of scholarship"],
  },
  scholarshipDocument: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("ApproveScholarship", approveScholarshipSchema);
