import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss'
import { useState } from "react";

export default function DayListItem(props) {
  const [day, setChange]=useState('')
console.log('DAY', day);
console.log('ITEM PROPS', props)

  const dayClass=classNames("day-list__item",{
    "--selected": props.selected,
    "--full": props.spots===0
  });
 
  const formatSpots =(spots)=>{
  if(spots===0){
    return "no spots remaining";
  }
  else if(spots===1){
return "1 spot remaining";
  } else return `${spots} spots remaining`};

  
  return (
    <li className={dayClass} onClick={()=>{setChange(props.name); console.log("DAYYYY", day);}}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}