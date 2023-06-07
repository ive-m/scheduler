
  export function getAppointmentsForDay(state, day) {
    const appointmentsArray = [];
    
    const filteredDay = state.days.filter(element => element.name === day);
    if (filteredDay[0] === undefined) {
      return appointmentsArray;
    }
    filteredDay[0].appointments.forEach(appointment => {
      appointmentsArray.push(state.appointments[appointment]);
    })
  
    return appointmentsArray;
  };
