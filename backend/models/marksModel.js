const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
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
    required: [true, "Enter the department"],
  },
  semester: {
    type: Number,
    required: [true, "Enter the semester."],
  },

  students: [
    {
      name: {
        type: String,
      },
      rollNumber: {
        type: Number,
      },
      enrollmentNumber: {
        type: String,
      },
      subjects: [
        {
          subjectName: {
            type: String,
          },
          classTest1: {
            type: Number,
          },
          classTest2: {
            type: Number,
          },
          endSemester: {
            type: Number,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Mark", marksSchema);
