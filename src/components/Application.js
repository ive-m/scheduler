import React, { useState, useEffect } from "react";
import "../components/Application.scss";
import DayList from "./DayList";
import axios from 'axios';
import {getAppointmentsForDay} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {/* Replace this with the schedule elements during the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
