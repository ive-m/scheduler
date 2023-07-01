
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(element => element.name === day);

  if (!filteredDay) {
    return [];
  }

  const appointmentsArray = filteredDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId];
  });

  return appointmentsArray;
}


  export function getInterview(state, interview){
    let interviewO = {};
    
    if (!interview) {
      return null;
    }
  
    const interviewerNo = state.interviewers[interview.interviewer];
  
    interviewO = {
      student: interview.student,
      interviewer: interviewerNo
    };
  
    return interviewO;
    
  };

  export function getInterviewersForDay(state, day) {
    const { days, interviewers } = state;
    const selectedDay = days.find(item => day === item.name);
  
    if (days.length < 1 || selectedDay === undefined) {
      return [];
    }
    const daysInterviewers = selectedDay.interviewers.map(
      interviewer => interviewers[interviewer]
    );
    return daysInterviewers;
  };
  
