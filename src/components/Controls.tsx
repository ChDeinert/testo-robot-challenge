import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRobotContext } from '../context/RobotContext';
import { DirectionType } from '../lib/robot';

type FormValues = {
  xCoordinate: string;
  yCoordinate: string;
  direction: string;
};

const Controls : React.FC = () => {
  const { 
    settings: { board, possibleDirections }, 
    state: { initialized }, 
    controls 
  } = useRobotContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onPlace : SubmitHandler<FormValues> = ({ xCoordinate, yCoordinate, direction } : FormValues) => {
    controls?.place(parseInt(xCoordinate), parseInt(yCoordinate), direction as DirectionType);
  };
  const onMoveClick = () => {
    controls?.move();
  };
  const onLeftClick = () => {
    controls?.turnLeft();
  };
  const onRightClick = () => {
    controls?.turnRight();
  };

  return !initialized ? (<p>loading...</p>) : (
    <>
      <form onSubmit={handleSubmit(onPlace)} style={{ display: 'flex', flexDirection: 'column' }} data-testid="robotplaceform">
        <label htmlFor="xCoordinate">
          X-Coordinate: 
          <input type="number" {...register('xCoordinate', { required: true, min: 0, max: board.xWidth - 1 })} min={0} max={board.xWidth - 1} size={1} />
          <span>{errors.xCoordinate?.type === 'required' && 'X-Coordinate is required!'}</span>
        </label>
        <label htmlFor="yCoordinate">
          Y-Coordinate: 
          <input type="number" {...register('yCoordinate', { required: true, min: 0, max: board.yWidth - 1 })} min={0} max={board.yWidth - 1} size={1} />
          {errors.yCoordinate?.type === 'required' && 'Y-Coordinate is required!'}
        </label>
        <label htmlFor="direction">
          Facing direction:
          <select {...register('direction', { required: true })}>
            {possibleDirections.map((direction, index) => (<option key={`direction_${index}`} value={direction}>{direction}</option>))}
          </select>
        </label>
        <input type="submit" value="place" />
      </form>
      <div data-testid="robotcontrolbuttons">
        <button onClick={onLeftClick}>left</button>
        <button onClick={onMoveClick}>move</button>
        <button onClick={onRightClick}>right</button>
      </div>
    </>
  );
};

export default Controls;