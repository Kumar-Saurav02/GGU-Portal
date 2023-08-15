const mongoose = require("mongoose");

const approveCourseSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
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
    required: [true, "Enter semester"],
  },
  name: {
    type: String,
    required: [true, "Enter Your Name"],
  },
  enrollmentNumber: {
    type: String,
    required: [true, "Enter Your Enrollment Number"],
  },

  subjects: [
    {
      subjectName: {
        type: String,
      },
      subjectCode: {
        type: String,
      },
      subjectCredit: {
        type: Number,
      },
      category: {
        type: String,
      },
      term: {
        type: String,
      },
    },
  ],
  backSubjects: [
    {
      subjectName: {
        type: String,
      },
      subjectCode: {
        type: String,
      },
      subjectCredit: {
        type: Number,
      },
      category: {
        type: String,
      },
      term: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ApproveCourse", approveCourseSchema);
