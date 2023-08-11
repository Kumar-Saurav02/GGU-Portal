const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    require: [true, "Enter the department"],
  },
  subjects: [
    {
      subjectName: {
        type: String,
        required: [true, "Subject name required"],
      },
      subjectCode: {
        type: String,
        required: [true, "Subject code required"],
      },
      subjectCredit: {
        type: Number,
        required: [true, "Subject credit required"],
      },
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
