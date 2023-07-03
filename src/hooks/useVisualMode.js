import React, { useState } from "react";

export default function useVisualMode(initial) {
  // Set the initial mode using useState
  const [history, setHistory] = useState([initial]);

  // Function to transition to a new mode
  const transition = (mode, replace = false) => {
    // Update the history array based on the replace flag
    setHistory(prev => replace ? [...prev.slice(0, -1), mode] : [...prev, mode]);
  };

  // Function to go back to the previous mode
  const back = () => {
    // Remove the last mode from the history array
    setHistory(prev => prev.slice(0, Math.max(prev.length - 1, 1)));
  };

  // Return the current mode, transition function, and back function
  return { mode: history[history.length - 1], transition, back };
};
