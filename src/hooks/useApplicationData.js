import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Set the initial state using useState
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Function to set the selected day
  const setDay = (day) => {
    setState((prevState) => ({
      ...prevState,
      day: day
    }));
  };

  // Fetch data from the API on initial component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch days, appointments, and interviewers data from the API 
        const [daysResponse, appointmentsResponse, interviewersResponse] = await Promise.all([
          axios.get("http://localhost:8001/api/days"),
          axios.get("http://localhost:8001/api/appointments"),
          axios.get("http://localhost:8001/api/interviewers")
        ]);

        // Update the state with the fetched data
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

  // Update spots when appointments state changes
  useEffect(() => {
    updateSpots();
  }, [state.appointments]);

  // Function to book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Send a PUT request to update the appointments table with the new interview data
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        // Update the state with the updated appointments data
        setState((prevState) => ({ ...prevState, appointments }));
      });
  }

  // Function to cancel an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Send a DELETE request to remove the interview from the appointments table
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        // Update the state with the updated appointments data
        setState((prevState) => ({ ...prevState, appointments }));
      });
  }

  // Function to update the number of spots available for each day
  function updateSpots() {
    setState((prevState) => {
      // Map through each day in the state and update the spots count
      const updatedDays = prevState.days.map((day) => {
        const updatedSpots = day.appointments.reduce((spotCount, appointmentId) => {
          if (!prevState.appointments[appointmentId].interview) {
            return spotCount + 1;
          }
          return spotCount;
        }, 0);
        return { ...day, spots: updatedSpots };
      });

      // Update the state with the updated days data
      return { ...prevState, days: updatedDays };
    });
  }

  // Return the state and functions as an object
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
