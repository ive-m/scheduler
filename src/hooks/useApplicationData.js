import {React, useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState(prevState => ({
      ...prevState,
      day: day
    }));
  };
 useEffect(() => {
    const fetchData = async () => {
      try {
        const [daysResponse, appointmentsResponse, interviewersResponse] = await Promise.all([
          axios.get("http://localhost:8001/api/days"),
          axios.get("http://localhost:8001/api/appointments"),
          axios.get("http://localhost:8001/api/interviewers")
        ]);

        setState(prev => ({
          ...prev,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState(prevState => ({
        ...prevState,
        appointments
      }));

      resolve(); // Resolve the promise to indicate successful saving
    });
  }

  

    function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(() => { 
        setState({...state, appointments})
      })
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
  