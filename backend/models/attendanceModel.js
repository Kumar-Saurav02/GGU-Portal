const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
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
    require: [true, "Enter the department"],
  },
  semester: {
    type: Number,
    require: [true, "Enter the semester."],
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
          months: [
            {
              monthName: {
                type: String,
              },
              attendance: {
                type: Number,
              },
              totalAttendance: {
                type: Number,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
