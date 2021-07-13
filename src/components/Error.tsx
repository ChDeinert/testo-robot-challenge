import React from 'react';
import { useRobotContext } from '../context/RobotContext';
import Warning from '../assets/svg/duotone-warning-circle-svgrepo-com.svg';
import './Error.css';

const Error : React.FC = () => {
  const { 
    state: { error }, 
  } = useRobotContext();
  
  return (
    <div className="error">
      {error && <i className="error__icon"><Warning aria-hidden="true" /></i>}
      {error && <span>{error?.message}</span>}
    </div>
  )
};

export default Error;