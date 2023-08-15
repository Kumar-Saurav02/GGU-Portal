const mongoose = require("mongoose");

const courseDepartmentSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    unique: true,
  },
  departments: [
    {
      departmentName: {
        type: String,
        required: true,
      },
    },
  ],
  maxSemester: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CourseDepartment", courseDepartmentSchema);
