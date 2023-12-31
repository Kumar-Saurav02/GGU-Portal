import React, { Fragment, useEffect, useState } from "react";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import "./DocumentUploadStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { uploadingFees, uploadingMarks } from "../../../actions/studentAction";
import { getAllSubjects } from "../../../actions/hodAction";
import { clearMessages } from "../../../actions/adminAction";
import { useDefaultDates } from "@mui/x-date-pickers/internals";

const DocumentUploadStudent = () => {
  const dispatch = useDispatch();
  const { student, loading } = useSelector(
    (state) => state.registerLoginStudents
  );

  const {
    loading: uploading,
    message,
    error,
  } = useSelector((state) => state.marksFeesCourseUpdate);

  const {
    loading: subjectLoading,
    subjects: allSubjects,
    error: subjectError,
  } = useSelector((state) => state.getAllSubjects);

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, message]);

  const [isCheckedFees, setIsCheckedFees] = useState(false);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [feeDetails, setFeeDetails] = useState({
    semesterForFees: "",
    bankNameForFees: "",
    accountNumberForFees: "",
    ifscCodeForFees: "",
    amountForFees: "",
    challanIdForFees: "",
    feeUploadDocument: "",
  });
  const {
    semesterForFees,
    bankNameForFees,
    accountNumberForFees,
    ifscCodeForFees,
    amountForFees,
    challanIdForFees,
    feeUploadDocument,
  } = feeDetails;

  const [dateOfPaymentForFees, setDateOfPaymentForFees] = useState();
  const [feeUpload, setFeeUpload] = useState();
  const [previewFeeUpload, setPreviewFeeUpload] = useState("");

  const registerFeeDataChange = (e) => {
    if (e.target.name === "feeUploadDocument") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFeeUpload(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setPreviewFeeUpload(e.target.value);
    } else {
      setFeeDetails({ ...feeDetails, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (student !== undefined && student.feeDetails !== undefined) {
      for (let i = 0; i < student.feeDetails.length; i++) {
        if (student.feeDetails[i].semester === semesterForFees) {
          toast.error("Fee details are uploaded for current semester");
        }
      }
    }
  }, [semesterForFees]);

  const [status, setStatus] = useState("1");

  const [resultDetails, setResultDetails] = useState({
    semesterForResult: "",
    cgpaForResult: "",
    sgpaForResult: "",
    resultUploadForResult: "",
  });
  const {
    semesterForResult,
    cgpaForResult,
    sgpaForResult,
    resultUploadForResult,
  } = resultDetails;

  const [resultUpload, setResultUpload] = useState();
  const [previewResultUpload, setPreviewResultUpload] = useState("");

  const registerResultDataChange = (e) => {
    if (e.target.name === "resultUploadForResult") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setResultUpload(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setPreviewResultUpload(e.target.value);
    } else {
      setResultDetails({ ...resultDetails, [e.target.name]: e.target.value });
    }
  };
  // useEffect(() => {
  //   if (student !== undefined && student.marksDetails !== undefined) {
  //     for (let i = 0; i < student.marksDetails.length; i++) {
  //       if (student.marksDetails[i].semester === semesterForResult) {
  //         toast.error("Result details are uploaded for current semester");
  //       }
  //     }
  //   }
  // }, [semesterForResult]);

  const submitFeeDataChange = () => {
    if (isCheckedFees === false) {
      return toast.error("Select the undertaking");
    }
    if (semesterForFees.trim() === "") {
      return toast.error("Fill semester properly");
    }
    if (bankNameForFees.trim() === "") {
      return toast.error("Fill Bank Name properly");
    }
    if (accountNumberForFees.trim() === "") {
      return toast.error("Fill account number properly");
    }
    if (ifscCodeForFees.trim() === "") {
      return toast.error("Fill IFSC Code properly");
    }
    if (amountForFees.trim() === "") {
      return toast.error("Fill amount properly");
    }
    if (challanIdForFees.trim() === "") {
      return toast.error("Fill challan ID properly");
    }
    if (feeUpload.trim() === "") {
      return toast.error("Upload document properly");
    }
    const updatingDateOfPayment = dateOfPaymentForFees.$d.toString().split(" ");
    const updatedDateOfPayment =
      updatingDateOfPayment[1] +
      " " +
      updatingDateOfPayment[2] +
      " " +
      updatingDateOfPayment[3];
    setIsCheckedFees(false);
    dispatch(
      uploadingFees(
        semesterForFees.trim(),
        bankNameForFees.trim(),
        accountNumberForFees.trim(),
        ifscCodeForFees.trim(),
        amountForFees.trim(),
        challanIdForFees.trim(),
        updatedDateOfPayment,
        feeUpload
      )
    );
  };

  const [currentSubjects, setCurrentSubjects] = useState([]);
  const [assignedSubject, setAssignedSubject] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (allSubjects !== undefined && allSubjects !== null) {
      setCurrentSubjects([]);
      setAssignedSubject([]);
      var tempArrayForSubjects = [];
      for (let i = 0; i < allSubjects.length; i++) {
        tempArrayForSubjects.push(allSubjects[i]);
      }
      setCurrentSubjects(tempArrayForSubjects);
    }
  }, [allSubjects]);

  console.log(currentSubjects);

  const addInput = () => {
    if (semesterForResult.trim() === "") {
      return toast.error("Select semester first");
    }
    setAssignedSubject((s) => {
      return [
        ...s,
        {
          value: "",
          completeValue: {},
          required: true,
        },
      ];
    });
  };
  const removeInput = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setAssignedSubject((s) => {
      let newArr = [...s];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    for (let i = 0; i < assignedSubject.length; i++) {
      if (assignedSubject[i].value.toString() === e.target.value.toString()) {
        return toast.error("Subject already selected");
      }
    }

    const index = e.target.id;
    setAssignedSubject((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      newArr[index].completeValue = JSON.parse(
        e.target.options[e.target.selectedIndex].dataset.complete
      );

      return newArr;
    });
  };

  const submitMarksDataChange = () => {
    if (isChecked === false) {
      return toast.error("Select the undertaking");
    }

    if (student.marksDetails) {
      for (let i = 0; i < student.marksDetails.length; i++) {
        if (
          student.marksDetails[i].semester.toString() ===
          semesterForResult.toString()
        ) {
          return toast.error("Result is already uploaded for current semester");
        }
      }
    }

    var listOfBackSubjects = [];

    if (status === "1") {
      if (semesterForResult.trim() === "") {
        return toast.error("Fill semester properly");
      }
      if (
        sgpaForResult.trim() === "" ||
        (sgpaForResult.trim() <= "10" && sgpaForResult.trim() >= "0")
      ) {
        return toast.error("Value should be between 0 and 10");
      }
      if (
        cgpaForResult.trim() === "" ||
        (cgpaForResult.trim() <= "10" && cgpaForResult.trim() >= "0")
      ) {
        return toast.error("Value should be between 0 and 10");
      }
      if (resultUpload.trim() === "") {
        return toast.error("Upload document properly");
      }
      setIsChecked(false);
      dispatch(
        uploadingMarks(
          semesterForResult.trim(),
          sgpaForResult.trim(),
          cgpaForResult.trim(),
          listOfBackSubjects,
          resultUpload,
          "Pass"
        )
      );
    } else if (status === "2") {
      if (semesterForResult.trim() === "") {
        return toast.error("Fill semester properly");
      }

      for (let i = 0; i < assignedSubject.length; i++) {
        if (Object.keys(assignedSubject[i].completeValue).length === 0) {
          return toast.error("Select the subject or remove unwanted subjects");
        } else {
          let termOfSubject = assignedSubject[i].completeValue.term.split(" ");
          listOfBackSubjects.push({
            subjectCode: assignedSubject[i].completeValue.subjectCode,
            subjectName: assignedSubject[i].completeValue.subjectName,
            subjectCredit: assignedSubject[i].completeValue.subjectCredit,
            semester: termOfSubject[0],
          });
        }
      }
      if (resultUpload.trim() === "") {
        return toast.error("Upload document properly");
      }
      setIsChecked(false);
      dispatch(
        uploadingMarks(
          semesterForResult.trim(),
          "0",
          "0",
          listOfBackSubjects,
          resultUpload,
          "Active Backlog"
        )
      );
    }
  };

  return (
    <Fragment>
      {loading || uploading || subjectLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="documentUploadStudent">
            <SidebarStudent />
            <div className="approvBox">
              <div className="subsection">
                <h2>fee Upload</h2>
                <hr></hr>
                <br></br>

                <div className="entry">
                  <label className="label_name" for="{semesterForFees}">
                    Semester
                  </label>
                  <select
                    id="label_input"
                    required
                    name="semesterForFees"
                    onChange={registerFeeDataChange}>
                    <option value={semesterForFees}>Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="entry">
                  <label className="label_name" for="{bankNameForFees}">
                    Bank Name
                  </label>
                  <input
                    id="label_input"
                    type="text"
                    placeholder="Bank Name"
                    required
                    name="bankNameForFees"
                    value={bankNameForFees}
                    onChange={registerFeeDataChange}
                  />
                </div>

                <div className="entry">
                  <label className="label_name" for="{ifscCodeForFees}">
                    IFSC Code
                  </label>
                  <input
                    id="label_input"
                    type="text"
                    placeholder="IFSC Code"
                    required
                    name="ifscCodeForFees"
                    value={ifscCodeForFees}
                    onChange={registerFeeDataChange}
                  />
                </div>

                <div className="entry">
                  <label className="label_name" for="{amountForFees}">
                    Amount
                  </label>
                  <input
                    id="label_input"
                    type="number"
                    placeholder="Amount"
                    required
                    name="amountForFees"
                    value={amountForFees}
                    onChange={registerFeeDataChange}
                  />
                </div>

                {/* <div>
                        <label>Challan ID</label>
                        <input
                          type="text"
                          placeholder="Challan ID"
                          required
                          name="challanIdForFees"
                          value={challanIdForFees}
                          onChange={registerFeeDataChange}
                        />
                      </div> */}

                {/* <div>
                        <label>Account Number</label>
                        <input
                          type="number"
                          placeholder="Account Number"
                          required
                          name="accountNumberForFees"
                          value={accountNumberForFees}
                          onChange={registerFeeDataChange}
                        />
                      </div> */}

                <div className="entry">
                  <label className="label_name" for="{dateOfPaymentForFees}">
                    Date of Payment
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="label_input"
                      label="Date Of Payment"
                      value={dateOfPaymentForFees}
                      onChange={(newValue) => setDateOfPaymentForFees(newValue)}
                    />
                  </LocalizationProvider>
                </div>

                <div className="entry">
                  <label className="label_name" for="{amountForFees}">
                    Fee Upload
                  </label>

                  <input
                    id="label_input"
                    type="file"
                    required
                    name="feeUploadDocument"
                    value={feeUploadDocument}
                    accept="pdf/*"
                    onChange={registerFeeDataChange}
                  />
                  <br></br>
                  <p>File:- {previewFeeUpload}</p>
                </div>
                <div className="course_selection_below">
                  <input
                    className="mr_CS"
                    type="checkbox"
                    onChange={(e) => setIsCheckedFees(!isCheckedFees)}
                  />
                  <p>
                    I hereby declare that the entries made by me in the
                    aforesaid form are complete and true to the best of my
                    knowledge.
                  </p>
                </div>
                <br></br>
                <div className="btn">
                  <button
                    className="normal_sb_btn border hover"
                    onClick={submitFeeDataChange}>
                    Submit
                  </button>
                </div>
              </div>

              <div className="subsection">
                <h2>Result Upload</h2>
                <hr></hr>
                <br></br>

                <div className="entry">
                  <label className="label_name" for="{semesterForResult">
                    Semester
                  </label>
                  <select
                    id="label_input"
                    required
                    name="semesterForResult"
                    onChange={registerResultDataChange}>
                    <option value={semesterForResult}>Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="entry">
                  <p className="label_name" > Status</p>
                  <select required onChange={(e) => setStatus(e.target.value)}>
                    <option value={1}>Pass</option>
                    <option value={2}>Active Backlog</option>
                  </select>
                </div>
                {status === "1" && (
                  <div>
                    <div className="entry">
                      <label className="label_name" for="{cgpaForResult}">
                        CGPA
                      </label>
                      <input
                        id="label_input"
                        type="number"
                        placeholder="CGPA"
                        required
                        name="cgpaForResult"
                        value={cgpaForResult}
                        onChange={registerResultDataChange}
                      />
                    </div>

                    <div className="entry">
                      <label className="label_name" for="{sgpaForResult}">
                        SGPA
                      </label>
                      <input
                        id="label_input"
                        type="number"
                        placeholder="SGPA"
                        required
                        name="sgpaForResult"
                        value={sgpaForResult}
                        onChange={registerResultDataChange}
                      />
                    </div>
                  </div>
                )}
                {status === "2" && (
                  <div>
                    {assignedSubject.map((item, uid) => {
                      return (
                        <div key={uid}>
                          <select
                            value={item.value}
                            id={uid}
                            onChange={handleChange}>
                            <option value="">Subjects</option>
                            {currentSubjects.map((subject) => (
                              <option
                                key={subject.subjectCode}
                                value={subject.subjectName}
                                data-complete={JSON.stringify(subject)}>
                                {subject.subjectName}
                              </option>
                            ))}
                          </select>
                          <button id={uid} onClick={removeInput}>
                            Remove
                          </button>
                        </div>
                      );
                    })}

                    <button onClick={addInput}>Add Backlog Subject</button>

                    <div>
                      <div className="entry">
                        <label className="label_name" for="{cgpaForResult}">
                          CGPA
                        </label>
                        <input
                          id="label_input"
                          type="number"
                          disabled
                          placeholder="CGPA"
                          required
                          value="0"
                        />
                      </div>

                      <div className="entry">
                        <label className="label_name" for="{sgpaForResult}">
                          SGPA
                        </label>
                        <input
                          id="label_input"
                          type="number"
                          placeholder="SGPA"
                          required
                          disabled
                          value="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="entry">
                  <label className="label_name" for="{amountForFees}">
                    Result Upload
                  </label>

                  <input
                    id="label_input"
                    type="file"
                    required
                    name="resultUploadForResult"
                    value={resultUploadForResult}
                    accept="pdf/*"
                    onChange={registerResultDataChange}
                  />
                  <p>File:- {previewResultUpload}</p>
                </div>
                <div className="course_selection_below">
                  <input
                    className="mr_CS"
                    type="checkbox"
                    id="check"
                    onChange={(e) => setIsChecked(!isChecked)}
                  />
                  <p>
                    I hereby declare that the entries made by me in the
                    aforesaid form are complete and true to the best of my
                    knowledge.
                  </p>
                </div>
                <br></br>
                <div className="btn">
                  <button
                    className="normal_sb_btn border hover"
                    onClick={submitMarksDataChange}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DocumentUploadStudent;
