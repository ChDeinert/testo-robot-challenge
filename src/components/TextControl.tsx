import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRobotContext } from '../context/RobotContext';
import { DirectionType } from '../lib/robot';
import './TextControl.css';

const TextControl : React.FC = () => {
  const { state: { initialized }, controls } = useRobotContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCommandSubmit: SubmitHandler<{ command: string }> = ({ command }) => {
    const currentCommand = command.trim().match(/^(\w+)\(/);

    switch (currentCommand && currentCommand[1]) {
      case 'place':
        const placeParams = command.trim().match(/\((\d+),\s?(\d+),\s?'?(NORTH|EAST|SOUTH|WEST)'?\)$/);
        const xCoordinate = (placeParams && parseInt(placeParams[1])) ?? -1;
        const yCoordinate = (placeParams && parseInt(placeParams[2])) ?? -1;
        const facing = (placeParams && placeParams[3]) ?? '';
        controls?.place(xCoordinate, yCoordinate, facing as DirectionType);
        break;
      case 'move':
        controls?.move();
        break;
      case 'left':
        controls?.turnLeft();
        break;
      case 'right':
        controls?.turnRight();
        break;
      case 'report':
        controls?.report();
        break;
    }
  };

  const validateCommand = (commandValue: string) => {
    if (!commandValue.trim().match(/^place\(\d+,\s?\d+,\s?'?(?:NORTH|EAST|SOUTH|WEST)'?\)$|^move\(\)$|^left\(\)$|^right\(\)$|^report\(\)$/)) {
      return `The command "${commandValue}" is invalid!`;
    }
    
    return true;
  };

  return !initialized ? (<p>loading...</p>) : (
    <details className="textcontrol">
      <summary>Manually type Commands for the robot</summary>
      <form onSubmit={handleSubmit(handleCommandSubmit)} className="textcontrol__form" data-testid="robotcommandform">
        <label htmlFor="textcontrol-command">
          Command: 
        </label>
        <input 
          type="text" 
          id="textcontrol-command"
          {...register('command', { required: 'A command is required', validate: validateCommand })} 
          className="textcontrol__form__input" 
          data-testid="robotcommand-input" 
        />
        <input type="submit" value="Send command" className="textcontrol__form__input" data-testid="robotcommand-submit" />
      </form>
      <div className="textcontrol__message">
        {errors?.command && (<span>{errors?.command.message}</span>)}
      </div>
    </details>
  );
};

export default TextControl;