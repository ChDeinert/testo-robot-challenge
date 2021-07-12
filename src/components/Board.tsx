import React from 'react';
import { useRobotContext } from '../context/RobotContext';
import Robot from '../assets/robot-svgrepo-com.svg';
import Chevron from '../assets/duotone-chevron-down-svgrepo-com.svg';

const getRotation = (direction: string) => {
  switch (direction) {
    case 'NORTH':
      return '180deg';
    case 'EAST':
      return '270deg';
    case 'SOUTH':
      return '0';
    case 'WEST':
      return '90deg';
  }
  return '0';
}

const Board : React.FC = () => {
  const { settings: { board }, state: { isPlaced, position } } = useRobotContext();
  let robotposition;

  try {
    robotposition = position?.toString();
  } catch (error) {
    console.log(error.message);
  }

  const tileRow = Array.from(new Array(board.xWidth));
  const tileColumn = Array.from(new Array(board.yWidth));
  const tiles = tileRow.map((_, yIndex) => {
    return tileColumn.map((_, xIndex) => (
      <div style={{ display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center', minHeight: '8rem', minWidth: '8rem', maxHeight: '8rem', maxWidth: '8rem', padding: '1rem', border: '1px solid black' }} key={`boardTile${xIndex}${yIndex}`} data-testid={`boardTile${xIndex}${yIndex}`}>
        {isPlaced && position?.xPosition === xIndex && position?.yPosition === yIndex && (
          <>
            <Robot style={{ width: '4rem', height: '4rem' }} />
            <Chevron viewBox='0 -32 24 54' style={{ 
              width: '8rem',
              height: '8rem',
              position: 'absolute', 
              transform: `rotate(${getRotation(position?.direction)})`,
            }} />
          </>
        )}
      </div>
    ))
  }).reverse();

  return <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>{tiles}</section>
};

export default Board;