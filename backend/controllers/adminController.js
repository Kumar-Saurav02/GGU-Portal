const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Session = require("../models/currentSessionModel");

//GET ALL STUDENTS
exports.getAllStudentsByAdmin = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    students,
  });
});

//GET ALL TEACHER
exports.getAllTeachersForAdmin = catchAsyncErrors(async (req, res, next) => {
  const teachers = await Teacher.find();

  res.status(200).json({
    success: true,
    teachers,
  });
});

//UPDATE TEACHER ROLE
exports.updateRoleOfTeacherByAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const newUserData = {
      subRole: req.body.role,
    };

    await Teacher.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Teacher Role Updated",
    });
  }
);
