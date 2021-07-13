import React from 'react';
import RobotSVG from '../assets/svg/robot-svgrepo-com.svg';
import ChevronSVG from '../assets/svg/duotone-chevron-down-svgrepo-com.svg';
import './Robot.css';

const Robot : React.FC<{ direction: string }> = ({ direction }) => {
  return (
    <span className="robot__wrapper">
      <RobotSVG className="robot" />
      <ChevronSVG className={`robot__direction-indicator robot__direction-indicator--${direction}`} viewBox='0 -32 24 54' />
    </span>
  );
};

export default Robot;