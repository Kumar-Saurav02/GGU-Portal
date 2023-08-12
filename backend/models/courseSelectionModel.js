const mongoose = require("mongoose");

const courseSelectionSchema = new mongoose.Schema({
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
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  courses: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
      subjectCredit: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("CourseSelection", courseSelectionSchema);
