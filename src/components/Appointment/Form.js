import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  // State variables for the form inputs and error message
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset the form inputs and error message
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // Cancel button handler - reset the form, call onCancel prop, and clear the error message
  const cancel = () => {
    reset();
    props.onCancel();
    setError("");
  };

  // Form validation and save function
  function validate() {
    if (student.trim() === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
  className="appointment__create-input text--semi-bold"
  type="text"
  value={student}
  placeholder="Enter Student Name"
  onChange={(event) => setStudent(event.target.value)}
  data-testid="form-student-input"
/>

          <section className="appointment__validation">{error}</section>
        </form>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={interviewerId => setInterviewer(interviewerId)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions" >
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
