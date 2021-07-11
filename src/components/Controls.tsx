import React from 'react';
import { useRobotContext } from '../context/RobotContext';

const Controls = () => {
  const { 
    settings: { board, possibleDirections }, 
    state: { initialized }, 
    controls 
  } = useRobotContext();

  const onPlace = event => {
    const xCoordinate = document.querySelector<HTMLFormElement>('#xCoordinate');
    const yCoordinate = document.querySelector<HTMLFormElement>('#yCoordinate');
    const direction = document.querySelector<HTMLFormElement>('#direction');

    controls?.place(xCoordinate.valueAsNumber, yCoordinate.valueAsNumber, direction.value);
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
      <form onSubmit={onPlace}>
        <label htmlFor="xCoordinate">
          X-Coordinate: 
          <input type="number" name="xCoordinate" id="xCoordinate" min="0" max={board.xWidth - 1} required size={1} />
        </label>
        <label htmlFor="yCoordinate">
          Y-Coordinate: 
          <input type="number" name="yCoordinate" id="yCoordinate" min="0" max={board.yWidth - 1} required size={1} />
        </label>
        <label htmlFor="direction">
          Facing direction:
          <select name="direction" id="direction">
            {possibleDirections.map((direction, index) => (<option key={`direction_${index}`} value={direction}>{direction}</option>))}
          </select>
        </label>
        <input type="button" value="place" onClick={onPlace} />
      </form>
      <div>
        <button onClick={onLeftClick}>left</button>
        <button onClick={onMoveClick}>move</button>
        <button onClick={onRightClick}>right</button>
      </div>
    </>
  );
};

export default Controls;