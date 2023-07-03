import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {


  if (!props.days) {
    return null; // Return null or another fallback UI if props.days is not defined
  }

  const days = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{days}</ul>;
}
