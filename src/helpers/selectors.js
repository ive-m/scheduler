export function getAppointmentsForDay(state, day) {
  // Find the day object in the state's days array that matches the input day
  const filteredDay = state.days.find(element => element.name === day);

  // If the day object is not found, return an empty array
  if (!filteredDay) {
    return [];
  }

  // Map over the appointment IDs in the filtered day's appointments array
  // Return the corresponding appointment objects from the state's appointments object
  const appointmentsArray = filteredDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId];
  });

  // Return the array of appointments for the selected day
  return appointmentsArray;
}

export function getInterview(state, interview) {
  let interviewNew = {};
  // If the interview object is falsy (null or undefined), return null
  if (!interview) {
    return null;
  }

  const interviewerNo = state.interviewers[interview.interviewer];
  // Create a new interview object with the student and interviewer information
  interviewNew = {
    student: interview.student,
    interviewer: interviewerNo
  };

  // Return the interview object
  return interviewNew;
}
export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;

  // Find the day object in the state's days array that matches the input day
  const selectedDay = days.find(item => day === item.name);

  // If there are no days or the selected day is undefined, return an empty array
  if (!selectedDay || !selectedDay.interviewers) {
    return [];
  }
  // Map over the interviewer IDs in the selected day's interviewers array
  // Return the corresponding interviewer objects from the state's interviewers object
  const daysInterviewers = selectedDay.interviewers.map(
    interviewer => interviewers[interviewer]
  );
  // Return the array of interviewers for the selected day
  return daysInterviewers;
}

