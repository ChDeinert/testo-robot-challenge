type Board = { xWidth: number, yWidth: number };
type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
type Position = { xPosition: undefined|number, yPosition: undefined|number, direction: undefined|Direction, toString?: () => string };

const defaultBoard : Board = {
  xWidth: 5,
  yWidth: 5,
};

const possibleDirections = [
  'NORTH', 'EAST', 'SOUTH', 'WEST'
];

const isRobotPlaced = (board : Board, possibleDirections: Direction[]) => (xCoordinate : undefined|number, yCoordinate : undefined|number, direction: undefined|Direction) : boolean => {
  if (!isValidXCoordinate(xCoordinate, board) || !isValidYCoordinate(yCoordinate, board) || !isValidDirection(direction, possibleDirections)) {
    return false;
  }

  return true;
};

const isValidXCoordinate = (xCoordinate : number, board: Board) : boolean => {
  if (typeof xCoordinate !== 'number' || xCoordinate < 0 || xCoordinate >= board.xWidth) {
    return false;
  }

  return true;
};

const isValidYCoordinate = (yCoordinate : number, board: Board) : boolean => {
  if (typeof yCoordinate !== 'number' || yCoordinate < 0 || yCoordinate >= board.yWidth) {
    return false;
  }

  return true;
};

const isValidDirection = (direction : Direction, possibleDirections: Direction[]) : boolean => {
  if (typeof direction !== 'string' || !possibleDirections.includes(direction)) {
    return false;
  }

  return true;
};

class Robot {
  private xPosition: undefined | number;
  private yPosition: undefined | number;
  private direction: undefined | Direction;
  private board: Board;
  private possibleDirections : Direction[];
  private isRobotPlaced;

  constructor(board: Board, possibleDirections : Direction[]) {
    this.board = board;
    this.possibleDirections = possibleDirections;
    this.isRobotPlaced = isRobotPlaced(board, possibleDirections);
  }

  place = (x: number, y: number, facing: Direction) : void => {
    if (!isValidXCoordinate(x, this.board)) {
      throw new Error('X Coordinate is invalid');
    }
    if (!isValidYCoordinate(y, this.board)) { 
      throw new Error('Y Coordinate is invalid');
    }
    if (!isValidDirection(facing, this.possibleDirections)) {
      throw new Error('The given direction, the Robot is facing, is invalid');
    }

    this.xPosition = x;
    this.yPosition = y;
    this.direction = facing;
  };

  move = () : void => {
    if (!this.isRobotPlaced(this.xPosition, this.yPosition, this.direction)) {
      throw new Error('The robot is not placed yet');
    }
  };

  left = () : void => {
    this.direction = this.nextDirection('left');
  };

  right = () : void => {
    this.direction = this.nextDirection('right');
  };

  report = () : Position => {
    if (!this.isRobotPlaced(this.xPosition, this.yPosition, this.direction)) {
      throw new Error('The robot is not placed yet');
    }

    return {
      xPosition: this.xPosition,
      yPosition: this.yPosition,
      direction: this.direction,
      toString: () => `${this.xPosition}, ${this.yPosition}, ${this.direction}`,
    };
  };

  private nextDirection = (turnDirection : 'left'|'right') : Direction => {
    if (!this.isRobotPlaced(this.xPosition, this.yPosition, this.direction)) {
      throw new Error('The robot is not placed yet');
    }

    switch (this.direction) {
      case 'NORTH':
        return turnDirection === 'left' ? 'WEST' : 'EAST';
      case 'EAST':
        return turnDirection === 'left' ? 'NORTH' : 'SOUTH';
      case 'SOUTH':
        return turnDirection === 'left' ? 'EAST' : 'WEST';
      case 'WEST':
        return turnDirection === 'left' ? 'SOUTH' : 'NORTH';
    }
  };
};

export default Robot;
export { defaultBoard, possibleDirections, isRobotPlaced, isValidXCoordinate, isValidYCoordinate, isValidDirection };