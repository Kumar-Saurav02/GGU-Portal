const mongoose = require("mongoose");

const detentionStudentSchema = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: [true, "Please enter enrollment number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have more than 6 characters"],
  },
  rollNo: {
    type: Number,
    required: [true, "Please fill your roll number"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  fatherName: {
    type: String,
    required: [true, "Please fill your father's name"],
  },
  motherName: {
    type: String,
    required: [true, "Please fill your mother's name"],
  },
  currentSemester: {
    type: Number,
    required: [true, "Please fill your semester"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please fill your mobile number"],
  },
  fatherMobileNumber: {
    type: String,
    required: [true, "Please fill your father's mobile number"],
  },
  motherMobileNumber: {
    type: String,
    required: [true, "Please fill your mother's mobile number"],
  },
  gender: {
    type: String,
    required: [true, "Please fill your gender"],
  },
  department: {
    type: String,
    required: [true, "Please fill your department"],
  },
  course: {
    type: String,
    required: [true, "Please fill your course"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please fill your date of birth"],
  },
  dateOfJoining: {
    type: String,
    required: [true, "Please fill your date of joining"],
  },
  religion: {
    type: String,
    required: [true, "Please fill your religion"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please fill your blood group"],
  },
  category: {
    type: String,
    required: [true, "Please fill your category"],
  },
  physicallyHandicapped: {
    type: String,
    required: [true, "Please fill required box"],
  },
  aadharNumber: {
    type: Number,
    required: [true, "Please fill your aadhar number"],
  },
  hosteler: {
    type: String,
    required: [true, "Please fill required box"],
  },
  yearOfJoining: {
    type: Number,
    required: [true, "Fill year of joining"],
  },
  currentSession: {
    type: String,
    required: [true, "Fill current session"],
  },
  feeDetails: [
    {
      semester: {
        type: Number,
      },
      bankName: {
        type: String,
      },
      accountNumber: {
        type: Number,
      },
      ifscCode: {
        type: String,
      },
      amount: {
        type: Number,
      },
      challanId: {
        type: String,
      },
      dateOfPayment: {
        type: String,
      },
      fees: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  localAddress: {
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  permanentAddress: {
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  marksDetails: [
    {
      semester: {
        type: Number,
      },
      status: {
        type: String,
      },
      cgpa: {
        type: Number,
        required: true,
      },
      sgpa: {
        type: Number,
        required: true,
      },
      backSubject: [
        {
          semester: {
            type: Number,
          },
          subjectName: {
            type: String,
          },
          subjectCode: {
            type: String,
          },
          subjectCredit: {
            type: String,
          },
        },
      ],
      result: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  photoUpload: {
    public_id: {
      type: String,
      required: [true, "Please upload the photo"],
    },
    url: {
      type: String,
      required: [true, "Please upload the photo"],
    },
  },
  signatureUpload: {
    public_id: {
      type: String,
      required: [true, "Please upload the signature"],
    },
    url: {
      type: String,
      required: [true, "Please upload the signature"],
    },
  },
  // attendanceDetails: [
  //   {
  //     semester: {
  //       type: Number,
  //     },
  //     attendance: {
  //       type: Number,
  //     },
  //     // subjects: [
  //     //   {
  //     //     subjectName: {
  //     //       type: String,
  //     //     },
  //     //     subjectTotalAttendance: {
  //     //       type: Number,
  //     //       default: 0,
  //     //     },
  //     //     months: [
  //     //       {
  //     //         monthName: {
  //     //           type: String,
  //     //         },
  //     //         attendance: {
  //     //           type: Number,
  //     //         },
  //     //         totalAttendance: {
  //     //           type: Number,
  //     //         },
  //     //       },
  //     //     ],
  //     //   },
  //     // ],
  //   },
  // ],
  courseSelected: [
    {
      session: {
        type: String,
        required: true,
      },
      semester: {
        type: Number,
        required: true,
      },
      attendanceDetails: {
        type: String,
        required: true,
      },
      subjects: [
        {
          subjectName: {
            type: String,
          },
          subjectCode: {
            type: String,
          },
          subjectCredit: {
            type: Number,
          },
          category: {
            type: String,
          },
          term: {
            type: String,
          },
        },
      ],
      backSubject: [
        {
          semester: {
            type: Number,
          },
          subjectName: {
            type: String,
          },
          subjectCode: {
            type: String,
          },
          subjectCredit: {
            type: String,
          },
          status: {
            type: String,
          },
        },
      ],
    },
  ],
  scholarshipDetails: [
    {
      session: {
        type: String,
        required: [true, "Session is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      district: {
        type: String,
        required: [true, "District is required"],
      },
      dateOfSubmission: {
        type: String,
        required: [true, "Date is required"],
      },
      scholarship: {
        type: String,
        required: [true, "Name is required"],
      },
      scholarshipDocument: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  role: {
    type: String,
  },
});

module.exports = mongoose.model("DetentionStudent", detentionStudentSchema);
