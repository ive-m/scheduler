import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState((prevState) => ({
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

        setState((prevState) => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateSpots(state.days, state.appointments);
  }, [state.appointments, state.days]);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          appointments
        }));
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
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          appointments
        }));
      });
  }

  function updateSpots(days, appointments) {
    setState((prevState) => {
      const updatedDays = prevState.days.map((day) => {
        const updatedSpots = day.appointments.reduce((spotCount, appointmentId) => {
          if (appointments[appointmentId] && !appointments[appointmentId].interview) {
            return spotCount + 1;
          }
          return spotCount;
        }, 0);
        return { ...day, spots: updatedSpots };
      });
  
      return { ...prevState, days: updatedDays };
    });
  }
  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
