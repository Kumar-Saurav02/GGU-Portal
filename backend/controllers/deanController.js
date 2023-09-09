const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Session = require("../models/currentSessionModel");
const ApproveStudent = require("../models/approveStudentModel");
const ApproveScholarship = require("../models/approveScholarshipModel");
const CourseSelection = require("../models/courseSelectionModel");
const ApproveTeacher = require("../models/approveTeacherModel");
const ApproveCourse = require("../models/approveCourseModel");
const Marks = require("../models/marksModel");
const Attendance = require("../models/attendanceModel");

//CREATE NEW SESSION
exports.createNewSession = catchAsyncErrors(async (req, res, next) => {
  const { course, session } = req.body;

  const findSession = await Session.findOne({
    course: course,
  });

  if (findSession) {
    for (var i = 0; i < findSession.session.length; i++) {
      if (
        findSession.session[i].sessionName.toString() === session.toString()
      ) {
        return next(
          new ErrorHandler("Session with this name already exist", 400)
        );
      }
    }
    await Session.updateOne(
      {
        course: course,
      },
      {
        $push: {
          session: {
            sessionName: session,
          },
        },
      }
    );
  } else {
    await Session.create({
      course,
      session: [
        {
          sessionName: session,
        },
      ],
    });
  }

  res.status(200).json({
    success: true,
    message: `Session ${session} created for ${course}`,
  });
});

//GET CURRENT SESSION
exports.getPresentSession = catchAsyncErrors(async (req, res, next) => {
  const { course } = req.user;

  const findSession = await Session.findOne({ course });

  if (!findSession) {
    return next(new ErrorHandler("No session found", 400));
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
  //delete bhi krna hua to students me fees scholarship sb delete krna hoga

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

//GET ALL ATTENDANCE
exports.getAllAttendanceForDean = catchAsyncErrors(async (req, res, next) => {
  const attendance = await Attendance.find({
    course: req.user.course,
  });

  if (!attendance) {
    return next(new ErrorHandler("No attendance exist", 400));
  }

  attendance.reverse();

  res.status(200).json({
    success: true,
    attendance,
  });
});

//GET ALL COURSE
exports.getAllCourseForDean = catchAsyncErrors(async (req, res, next) => {
  const course = await CourseSelection.find({
    course: req.user.course,
  });

  if (!course) {
    return next(new ErrorHandler("No course exist", 400));
  }
  course.reverse();

  res.status(200).json({
    success: true,
    course,
  });
});

//REMOVE ATTENDANCE
exports.removeAttendanceForSession = catchAsyncErrors(
  async (req, res, next) => {
    const { session, department, semester } = req.body;
    const attendance = await Attendance.deleteOne({
      session: session,
      course: req.user.course,
      department: department,
      semester: semester,
    });

    if (!attendance) {
      return next(new ErrorHandler("No attendance found", 401));
    }

    res.status(200).json({
      success: true,
      message: "Attendance removed",
    });
  }
);

//REMOVE COURSE
exports.removeCourseForSession = catchAsyncErrors(async (req, res, next) => {
  const { session, department, semester } = req.body;
  const course = await CourseSelection.deleteOne({
    session: session,
    course: req.user.course,
    department: department,
    semester: semester,
  });

  if (!course) {
    return next(new ErrorHandler("No course found", 401));
  }

  res.status(200).json({
    success: true,
    message: "Course removed",
  });
});

//GET ALL STUDENTS
exports.getAllStudentsForDean = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find({
    course: req.user.course,
  });

  res.status(200).json({
    success: true,
    students,
  });
});

//UPDATE STUDENTS DATA BY DEAN OR HOD
exports.updateStudentsDataByDeanOrHOD = catchAsyncErrors(
  async (req, res, next) => {
    const {
      student_id,
      newEnrollmentNumber,
      newRollNumber,
      newName,
      newFatherName,
      newMotherName,
      newSemester,
      newEmail,
      newGender,
      newDepartment,
      newCourse,
      newReligion,
      newBloodGroup,
      newCategory,
      newPhysicallyHandicapped,
      newAadhar,
      newHosteler,
      newLocalAddress,
      newLocalState,
      newPinCode,
      newPermanentAddress,
      newPermanentState,
      newPermanentPinCode,
      newDateOfBirthStudent,
    } = req.body;

    const student = await Student.findById({ _id: student_id });

    if (student._id.toString() !== student_id.toString()) {
      return next(
        new ErrorHandler(
          `Student with enrollment number: ${newEnrollmentNumber} already exist`,
          401
        )
      );
    }

    await Student.findByIdAndUpdate(
      { _id: student_id },
      {
        enrollmentNo: newEnrollmentNumber,
        rollNo: newRollNumber,
        name: newName,
        fatherName: newFatherName,
        motherName: newMotherName,
        currentSemester: newSemester,
        email: newEmail,
        gender: newGender,
        department: newDepartment,
        course: newCourse,
        dateOfBirth: newDateOfBirthStudent,
        religion: newReligion,
        bloodGroup: newBloodGroup,
        category: newCategory,
        physicallyHandicapped: newPhysicallyHandicapped,
        aadharNumber: newAadhar,
        hosteler: newHosteler,
        localAddress: {
          address: newLocalAddress,
          state: newLocalState,
          pinCode: newPinCode,
        },
        permanentAddress: {
          address: newPermanentAddress,
          state: newPermanentState,
          pinCode: newPermanentPinCode,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student Data Updated",
    });
  }
);

//UPDATE TEACHER DATA BY DEAN
exports.updateTeachersDataByDean = catchAsyncErrors(async (req, res, next) => {
  const {
    teacher_id,
    newEmployeeID,
    newEmail,
    newName,
    newGender,
    newCourse,
    newDepartment,
    newDesignation,
    newQualification,
    newDateOfBirthTeacher,
  } = req.body;

  const teacher = await Teacher.findById({ _id: teacher_id });

  if (teacher._id.toString() !== teacher_id.toString()) {
    return next(
      new ErrorHandler(
        `Teacher with employee ID: ${newEmployeeID} already exist`,
        401
      )
    );
  }

  await Teacher.findByIdAndUpdate(
    { _id: teacher_id },
    {
      employeeID: newEmployeeID,
      name: newName,
      email: newEmail,
      gender: newGender,
      department: newDepartment,
      course: newCourse,
      dateOfBirth: newDateOfBirthTeacher,
      designation: newDesignation,
      qualification: newQualification,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Teacher Data Updated",
  });
});
