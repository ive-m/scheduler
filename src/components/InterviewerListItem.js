import React from "react";

import 'components/InterviewerListItem.scss'
import classNames from "classnames";

export default function InterviewerListItem(props){

  console.log('PROPS OF INTERVIEWER ITEM', props);



  const interviewerClass= classNames("interviewers_item",{
    "--selected": props.selected,
    
  });


    return (
      <li className={interviewerClass} onClick={
 props.setInterviewer

     
      
      
      
      
      }>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     
    </li>);
  }

