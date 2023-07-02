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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interviewData = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interviewData)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    const appointmentId = id;

    if (mode === CONFIRM) {
      transition(DELETING, true);

      cancelInterview(appointmentId)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  };

  const onEdit = () => {
    transition(EDIT);
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
