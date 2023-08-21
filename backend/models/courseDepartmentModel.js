const mongoose = require("mongoose");

const courseDepartmentSchema = new mongoose.Schema({
  schools: {
    type: String,
    required: true,
  },
  courses: [
    {
      courseName: {
        type: String,
        required: true,
      },
      maxSemester: {
        type: Number,
        required: true,
      },
      departments: [
        {
          departmentName: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("CourseDepartment", courseDepartmentSchema);
