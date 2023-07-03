import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  // Using custom hook useVisualMode to manage component modes
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Save appointment function
  const save = (name, interviewer) => {
    const interviewData = {
      student: name,
      interviewer,
    };

    transition(SAVING); // Transition to the "SAVING" mode

    bookInterview(id, interviewData) // Call the bookInterview function passed as a prop
      .then(() => transition(SHOW)) // On successful save, transition to the "SHOW" mode
      .catch(() => transition(ERROR_SAVE, true)); // On error, transition to the "ERROR_SAVE" mode
  };

  // Delete appointment function
  const onDelete = () => {
    const appointmentId = id;

    if (mode === CONFIRM) {
      transition(DELETING, true); // Transition to the "DELETING" mode

      cancelInterview(appointmentId) // Call the cancelInterview function passed as a prop
        .then(() => transition(EMPTY)) // On successful deletion, transition to the "EMPTY" mode
        .catch(() => transition(ERROR_DELETE, true)); // On error, transition to the "ERROR_DELETE" mode
    } else {
      transition(CONFIRM); // If not in "CONFIRM" mode, transition to the "CONFIRM" mode
    }
  };

  const onEdit = () => {
    transition(EDIT); // Transition to the "EDIT" mode
  };


  return (
    <article className="appointment" data-testid="appointment">

      <Header id={id} time={time} />
      {mode === EMPTY ? (
        <Empty onAdd={() => transition(CREATE)} />
      ) : mode === SAVING ? (
        <Status message="Saving" />
      ) : mode === DELETING ? (
        <Status message="Deleting" />
      ) : mode === CONFIRM ? (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={onDelete}
        />
      ) : mode === SHOW ? (

        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ) : mode === CREATE ? (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      ) : mode === EDIT ? (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      ) : mode === ERROR_DELETE ? (
        <Error
          message="Error: Could not delete appointment."
          onClose={back}
        />
      ) : mode === ERROR_SAVE ? (
        <Error
          message="Error: Could not save appointment."
          onClose={back}
        />
      ) : null}
    </article>
  );
}
