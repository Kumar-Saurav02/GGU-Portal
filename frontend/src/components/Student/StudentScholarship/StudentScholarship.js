import * as React from "react";
import { useState, Fragment, useEffect } from "react";
import "./StudentScholarship.css";
import { State } from "country-state-city";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import { submitScholarship } from "../../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { clearMessages } from "../../../actions/adminAction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

const StudentScholarship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studentState, setStudentState] = useState();
  const [session, setSession] = useState();
  const [name, setName] = useState();
  const [document, setDocument] = useState("");
  const [district, setDistrict] = useState("");
  const [dateOfSubmission, setDateOfSubmission] = useState();

  const {
    loading: uploading,
    message,
    error,
  } = useSelector((state) => state.marksFeesCourseUpdate);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/studentProfile");
    }
  }, [error, message]);

  const [isCheckedScholarship, setIsCheckedScholarship] = useState(false);

  const documentChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setDocument(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitScholarshipDetails = () => {
    if (isCheckedScholarship === false) {
      return toast.error("Select the undertaking");
    }
    if (
      session === undefined ||
      studentState === undefined ||
      district === undefined ||
      name === undefined ||
      document === undefined
    ) {
      return toast.error("Fill information properly");
    }
    if (session.trim() === "") {
      return toast.error("Fill session properly");
    }
    if (studentState.trim() === "") {
      return toast.error("Fill state properly");
    }
    if (district.trim() === "") {
      return toast.error("Fill name of district properly");
    }
    if (name.trim() === "") {
      return toast.error("Fill name of scholarship properly");
    }
    if (document.trim() === "") {
      return toast.error("Upload Document Of Proof");
    }

    const dateOfScholarshipSubmission = dateOfSubmission.$d
      .toString()
      .split(" ");
    const updatedDateOfScholarshipSubmission =
      dateOfScholarshipSubmission[1] +
      " " +
      dateOfScholarshipSubmission[2] +
      " " +
      dateOfScholarshipSubmission[3];

    setIsCheckedScholarship(false);

    dispatch(
      submitScholarship(
        session,
        studentState,
        name,
        document,
        district,
        updatedDateOfScholarshipSubmission
      )
    );
  };

  return (
    <Fragment>
      {uploading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="scholarshipStudent">
            <SidebarStudent />

            <div className="approvBox">
              <h1>Scholarship</h1>
              <hr></hr>
              <br></br>
              <div className="subsection">
                <div className="entry">
                  <label className="label_name" for="{studentState}">
                    State
                  </label>
                  <select
                    id="label_input"
                    required
                    value={studentState}
                    onChange={(e) => setStudentState(e.target.value)}>
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry("IN").map((item) => (
                        <option key={item.isoCode} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="entry">
                  <label className="label_name" for="{district}">
                    District
                  </label>
                  <input
                    id="label_input"
                    type="text"
                    placeholder="Name of District"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>

                <div className="entry">
                  <label className="label_name" for="{name}">
                    Scholarship's Name
                  </label>
                  <input
                    id="label_input"
                    type="text"
                    placeholder="Name of Scholarship"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="entry">
                  <label className="label_name" for="{session}">
                    Session
                  </label>
                  <input
                    id="label_input"
                    type="number"
                    placeholder="eg:- 2010-2011"
                    required
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                  />
                </div>
                <div className="entry">
                  <label className="label_name" for="{dateOfSubmission}">
                    Date of Submission
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="label_input"
                      label="Date Of Payment"
                      value={dateOfSubmission}
                      onChange={(newValue) => setDateOfSubmission(newValue)}
                    />
                  </LocalizationProvider>
                </div>

                <div className="entry">
                  <label className="label_name" for="{photoUploadStudent}">
                    Upload Related pdf
                  </label>

                  <div className="address" id="label_input">
                    <input
                      type="file"
                      accept="pdf/*"
                      onChange={documentChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setIsCheckedScholarship(!isCheckedScholarship)
                    }
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
                    className=" signInbtn border hover"
                    onClick={submitScholarshipDetails}>
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

export default StudentScholarship;
