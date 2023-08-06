const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");

//REMOVE TEACHER DATA
exports.removeTeacher = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  await cloudinary.uploader.destroy(teacher.profilePhoto.public_id);
  await cloudinary.uploader.destroy(teacher.signature.public_id);
  await cloudinary.uploader.destroy(teacher.resume.public_id);

  await Teacher.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Teacher data removed successfully",
  });
});

//REMOVE STUDENT DATA
exports.removeStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student Data does not exist anymore", 401));
  }

  await cloudinary.uploader.destroy(
    student.photoUpload && student.photoUpload.public_id
  );

  await cloudinary.uploader.destroy(
    student.signatureUpload && student.signatureUpload.public_id
  );

  await Student.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Student data removed successfully",
  });
});

// //ADMIN REGISTER
// exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
//   const { email, name, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return next(new ErrorHandler("Password does not match"));
//   }

//   const adminExist = await Admin.findOne({
//     email,
//   });
//   if (adminExist) {
//     return next(new ErrorHandler("Admin already registered"));
//   }

//   const admin = await Admin.create({
//     email,
//     name,
//     password,
//     role: "admin",
//   });

//   sendToken(admin, 201, res);
// });

// //LOGIN ADMIN
// exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please enter email and password both", 400));
//   }

//   const admin = await Admin.findOne({
//     email,
//   }).select("+password");
//   if (!admin) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   const isPasswordMatched = await admin.comparePassword(password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   sendToken(admin, 200, res);
// });
