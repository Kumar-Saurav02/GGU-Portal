const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subject = require("../models/subjectModel");
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
const DetainStudent = require("../models/detentionStudentModel");
const PassedStudent = require("../models/passedOutStudentModel");

exports.createSubject = catchAsyncErrors(async (req, res, next) => {
  const { subjectName, subjectCode, subjectCredit } = req.body;

  if (
    subjectName.trim() === "" ||
    subjectCode.trim() === "" ||
    subjectCredit < 0
  ) {
    return next(new ErrorHandler("Enter details properly", 401));
  }

  const subjectExist = await Subject.findOne({
    course: req.user.course,
    department: req.user.department,
  });

  if (subjectExist) {
    for (let i = 0; i < subjectExist.subjects.length; i++) {
      if (
        subjectExist.subjects[i].subjectCode.toString() ===
          subjectCode.toString() ||
        subjectExist.subjects[i].subjectName.toString() ===
          subjectName.toString()
      ) {
        return next(
          new ErrorHandler(
            `Subject exist with subject code ${subjectCode} or subject name ${subjectName}`,
            401
          )
        );
      }
    }
    await Subject.updateOne(
      { course: req.user.course, department: req.user.department },
      {
        $push: {
          subjects: {
            subjectCode: subjectCode,
            subjectName: subjectName,
            subjectCredit: subjectCredit,
          },
        },
      }
    );
  } else {
    await Subject.create({
      course: req.user.course,
      department: req.user.department,
      subjects: [
        {
          subjectName,
          subjectCode,
          subjectCredit,
        },
      ],
    });
  }

  res.status(201).json({
    success: true,
    message: "Subject Created Successfully",
  });
});

exports.getAllSubjects = catchAsyncErrors(async (req, res, next) => {
  const subjects = await Subject.findOne({
    course: req.user.course,
    department: req.user.department,
  });

  if (subjects === null || subjects === undefined) {
    return next(new ErrorHandler(`No subjects found create one`, 401));
  }

  res.status(200).json({
    success: true,
    subjects,
  });
});

//
exports.removeSubject = catchAsyncErrors(async (req, res, next) => {
  const { subjectName, subjectCode } = req.body;

  const subjectExist = await Subject.findOne({
    course: req.user.course,
    department: req.user.department,
  });

  if (subjectExist) {
    for (let i = 0; i < subjectExist.subjects.length; i++) {
      if (
        subjectExist.subjects[i].subjectCode.toString() ===
          subjectCode.toString() ||
        subjectExist.subjects[i].subjectName.toString() ===
          subjectName.toString()
      ) {
        await Subject.updateOne(
          { course: req.user.course, department: req.user.department },
          {
            $pull: {
              subjects: {
                subjectCode: subjectCode,
                subjectName: subjectName,
              },
            },
          }
        );
      }
    }
  }

  res.status(200).json({
    success: true,
    message: "Subject removed successfully",
  });
});

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const { session, semester, courses } = req.body;
  const department = req.user.department;
  const course = req.user.course;

  const getCourse = await CourseSelection.findOne({
    session: session,
    course: course,
    department: department,
    semester: semester,
  });
  if (getCourse) {
    return next(new ErrorHandler("Course already exists", 401));
  }

  let coursesDetails = [];
  for (let i = 0; i < courses.length; i++) {
    coursesDetails.push({
      subjectName: courses[i][0],
      subjectCode: courses[i][1],
      subjectCredit: courses[i][2],
      category: courses[i][3],
    });
  }

  await CourseSelection.create({
    session: session,
    course: course,
    department: department,
    semester: semester,
    courses: coursesDetails,
  });

  res.status(201).json({
    success: true,
    message: `Course Created for semester ${semester}`,
  });
});

//ASSIGNING SUBJECT TO TEACHERS
exports.assignSubjectToTeacher = catchAsyncErrors(async (req, res, next) => {
  const { listOfAssignedSubjects, id } = req.body;

  await Teacher.findByIdAndUpdate(
    id,
    { assignSubject: listOfAssignedSubjects },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Details Updated Successfully",
  });
});

//PROMOTE STUDENT
exports.promoteStudent = catchAsyncErrors(async (req, res, next) => {
  const { listOfStudentsToPromote, session } = req.body;

  if (listOfStudentsToPromote.length === 0) {
    return next(
      new ErrorHandler("None of the students were selected for promotion", 401)
    );
  }

  for (let i = 0; i < listOfStudentsToPromote.length; i++) {
    let idOfStudent = listOfStudentsToPromote[i]._id;
    let semester = listOfStudentsToPromote[i].currentSemester;

    if (semester.toString() === "8") {
      await PassedStudent.create(listOfStudentsToPromote[i]);
      await Student.findOneAndDelete({ _id: idOfStudent });
    } else {
      await Student.findByIdAndUpdate(
        idOfStudent,
        { currentSemester: semester + 1, currentSession: session },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    }
  }

  res.status(200).json({
    success: true,
    message: "Students Promoted",
  });
});

//DETAIN STUDENT
exports.detainStudent = catchAsyncErrors(async (req, res, next) => {
  const { listOfStudentsToDetain } = req.body;

  if (listOfStudentsToDetain.length === 0) {
    return next(
      new ErrorHandler("None of the students were selected for detention", 401)
    );
  }

  for (let i = 0; i < listOfStudentsToDetain.length; i++) {
    let idOfStudent = listOfStudentsToDetain[i]._id;

    let studentData = await Student.findById(idOfStudent).select("+password");
    listOfStudentsToDetain[i].password = studentData.password;
    await DetainStudent.create(listOfStudentsToDetain[i]);

    await Student.findOneAndDelete({ _id: idOfStudent });
  }

  res.status(200).json({
    success: true,
    message: "Students Detained",
  });
});
