import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory(prev => replace ? [...prev.slice(0, -1), mode] : [...prev, mode]);
  };

  const back = () => {
    setHistory(prev => prev.slice(0, Math.max(prev.length - 1, 1)));
  };

  return { mode: history[history.length - 1], transition, back };
};
