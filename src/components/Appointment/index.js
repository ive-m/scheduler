import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function save(props, name, interviewer, transition) {
  const interview = {
    student: name,
    interviewer
  };
console.log("Appointment ID:", props.id); // Verify the appointment ID
console.log("Interview:", interview); // Verify the interview object
props.bookInterview(props.id, interview);
transition(SHOW); // Transition to SHOW mode
}


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} bookInterview={props.bookInterview}  />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    interview={props.interview}
    bookInterview={props.bookInterview}
  />
)}
       {mode === CREATE && 
       <Form 
            interviewers={props.interviewers}
            student={props.student}
            interviewer={props.interviewer}
            onCancel={() => back()}
            onSave={(name, interviewer) => save(props, name, interviewer, transition)}/>}
    </article>
  );
}
