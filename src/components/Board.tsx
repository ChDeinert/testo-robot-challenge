import React from 'react';
import { useRobotContext } from '../context/RobotContext';

const Board = () => {
  const { state: { initialized, isPlaced, position} } = useRobotContext();
  let robotposition;

  try {
    robotposition = position?.toString();
  } catch (error) {
    console.log(error.message);
  }
  
  return <section>{ !initialized ? `loading` : `Current Robot Position: ${isPlaced ? robotposition : 'Not placed yet'}` }</section>;
};

export default Board;