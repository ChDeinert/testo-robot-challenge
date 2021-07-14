import React from 'react';
import { useRobotContext } from '../context/RobotContext';
import './Board.css';

const Board : React.FC<{ render: (position : { xPosition: number, yPosition: number, direction: string }) => JSX.Element }> = ({ render }) => {
  const { settings: { board }, state: { isPlaced, position, error } } = useRobotContext();

  // The creation of the visual Representation seems a bit hacky (and isn't the most performant) but does the trick,
  // the `.reverse()` at the end is needed so that the Tile with the Coordinate 0, 0 is in the lower left.
  const tileRow = Array.from(new Array(board.xWidth));
  const tileColumn = Array.from(new Array(board.yWidth));
  const tiles = tileRow.map((_, yIndex) => {
    return tileColumn.map((_, xIndex) => (
      <div className="board__tile" key={`boardTile${xIndex}${yIndex}`} data-testid={`boardTile${xIndex}${yIndex}`} data-coordinates={`${xIndex} ${yIndex}`}>
        {isPlaced && position?.xPosition === xIndex && position?.yPosition === yIndex && render(position)}
      </div>
    ))
  }).reverse();

  return <section className={`board${error ? ' board--with-error' : ''}`}>{tiles}</section>
};

export default Board;
