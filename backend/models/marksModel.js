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

  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
      detailsOfMarks: {
        classTest1: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
        classTest2: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
        endSemester: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      },
    },
  ],
});

module.exports = mongoose.model("Mark", marksSchema);
