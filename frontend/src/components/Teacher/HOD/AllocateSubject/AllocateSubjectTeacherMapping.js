import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAssignSubjectToTeacher } from "../../../../actions/hodAction";

const AllocateSubjectTeacherMapping = ({ data, subjects }) => {
  const dispatch = useDispatch();

  const [assignedSubject, setAssignedSubject] = useState([]);

  useEffect(() => {
    const tempAssignedSubject = [];
    for (let i = 0; i < data.assignSubject.length; i++) {
      tempAssignedSubject.push({
        value: data.assignSubject[i].subjectName,
        completeValue: data.assignSubject[i],
      });
    }
    setAssignedSubject(tempAssignedSubject);
  }, []);

  const addInput = () => {
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
      newArr[index].completeValue =
        e.target.options[e.target.selectedIndex].dataset.complete !== null &&
        e.target.options[e.target.selectedIndex].dataset.complete !== undefined
          ? JSON.parse(
              e.target.options[e.target.selectedIndex].dataset.complete
            )
          : null;

      return newArr;
    });
  };

  const updateAssignedSubject = () => {
    let listOfAssignedSubjects = [];
    for (let i = 0; i < assignedSubject.length; i++) {
      if (
        assignedSubject[i].completeValue === null ||
        assignedSubject[i].completeValue === undefined ||
        Object.keys(assignedSubject[i].completeValue).length === 0
      ) {
        return toast.error("Select the subject or remove unwanted subjects");
      } else {
        listOfAssignedSubjects.push({
          subjectCode: assignedSubject[i].completeValue.subjectCode,
          subjectName: assignedSubject[i].completeValue.subjectName,
          subjectCredit: assignedSubject[i].completeValue.subjectCredit,
        });
      }
    }
    dispatch(updateAssignSubjectToTeacher(listOfAssignedSubjects, data._id));
  };

  return (
    <Fragment>
      <div>
        <div>
          <p>Name: {data.name}</p>
        </div>
        <div>
          <p>Employee ID: {data.employeeID}</p>
        </div>
        <div>
          <p>Designation: {data.designation}</p>
        </div>
        <div>
          <p>Department: {data.department}</p>
        </div>
        <div>
          {data.assignSubject && data.assignSubject.length === 0 && (
            <div>
              <p>No Subjects Assigned</p>
            </div>
          )}
        </div>
        <div>
          {assignedSubject.map((item, uid) => {
            return (
              <div key={uid}>
                <p>
                  Subject {uid + 1}: {item.value}
                </p>
                <select value={item.value} id={uid} onChange={handleChange}>
                  <option value="">Subjects</option>
                  {subjects &&
                    subjects.subjects &&
                    subjects.subjects.map((subject) => (
                      <option
                        key={subject.subjectCode}
                        value={subject.subjectName}
                        data-complete={
                          subject !== null && subject !== undefined
                            ? JSON.stringify(subject)
                            : null
                        }>
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

          <button onClick={addInput}>Add Subject</button>
        </div>
        <div>
          <button onClick={updateAssignedSubject}>Update</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </Fragment>
  );
};

export default AllocateSubjectTeacherMapping;
