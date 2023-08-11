const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Session = require("../models/currentSessionModel");

//CREATE NEW SESSION
exports.createNewSession = catchAsyncErrors(async (req, res, next) => {
  const { course, department, session } = req.body;

  const findSession = await Session.findOne({ course, department });

  if (findSession) {
    if (findSession.session.toString() === session()) {
      return next(new ErrorHandler("Session already present", 401));
    } else {
      await Session.updateOne(
        { course, department },
        { $set: { session: session } }
      );
    }
  } else {
    await Session.create({
      course,
      department,
      session,
    });
  }

  res.status(200).json({
    success: true,
    message: `Session ${session} created for ${department}`,
  });
});

//GET CURRENT SESSION
exports.getPresentSession = catchAsyncErrors(async (req, res, next) => {
  const { course, department } = req.user;

  const findSession = await Session.findOne({ course, department });

  if (!findSession) {
    return next(new ErrorHandler("No session found", 401));
  }

  res.status(200).json({
    success: true,
    session: findSession,
  });
});

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

  // remove mt kro ek model bna lo deleted students ka and teachers ka alag

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
