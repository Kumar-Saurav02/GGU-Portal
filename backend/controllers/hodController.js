const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subject = require("../models/subjectModel");
const CourseSelection = require("../models/courseSelectionModel");
const Teacher = require("../models/teacherModel");

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

  const getCourse = await CourseSelection.findOne({ semester, department });
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
    session,
    course: req.user.course,
    semester,
    department: req.user.department,
    course: coursesDetails,
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

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {});
