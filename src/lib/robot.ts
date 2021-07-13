type BoardType = { xWidth: number, yWidth: number };
type DirectionType = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
type PositionType = { xPosition?: number, yPosition?: number, direction?: DirectionType, toString?: () => string };

const defaultBoard : BoardType = {
  xWidth: 5,
  yWidth: 5,
};

const possibleDirections = [
  'NORTH' as DirectionType, 'EAST' as DirectionType, 'SOUTH' as DirectionType, 'WEST' as DirectionType
];

const isRobotPlaced = (board : BoardType, possibleDirections: DirectionType[]) => (xCoordinate?: number, yCoordinate?: number, direction?: DirectionType) : boolean => {
  if (typeof xCoordinate !== 'number' || !isValidXCoordinate(xCoordinate, board) || 
      typeof yCoordinate !== 'number' || !isValidYCoordinate(yCoordinate, board) || 
      typeof direction === 'string' && !isValidDirection(direction, possibleDirections)) {
    return false;
  }

  return true;
};

const isValidXCoordinate = (xCoordinate: number, board: BoardType) : boolean => {
  if (typeof xCoordinate !== 'number' || isNaN(xCoordinate) || xCoordinate < 0 || xCoordinate >= board.xWidth) {
    return false;
  }

  return true;
};

const isValidYCoordinate = (yCoordinate: number, board: BoardType) : boolean => {
  if (typeof yCoordinate !== 'number' || isNaN(yCoordinate) || yCoordinate < 0 || yCoordinate >= board.yWidth) {
    return false;
  }

  return true;
};

const isValidDirection = (direction: DirectionType, possibleDirections: DirectionType[]) : boolean => {
  if (typeof direction !== 'string' || !possibleDirections.includes(direction)) {
    return false;
  }

  return true;
};

class Robot {
  private xPosition?: number;
  private yPosition?: number;
  private direction?: DirectionType;
  private board: BoardType;
  private possibleDirections : DirectionType[];
  private isRobotPlaced;

  constructor(board: BoardType, possibleDirections: DirectionType[]) {
    this.board = board;
    this.possibleDirections = possibleDirections;
    this.isRobotPlaced = isRobotPlaced(board, possibleDirections);
  }

  place = (x: number, y: number, facing: DirectionType) : void => {
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

    switch (this.direction) {
      case 'NORTH':
        if (typeof this.yPosition !== 'number' || !isValidYCoordinate(this.yPosition + 1, this.board)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        ++this.yPosition;
        break;
      case 'EAST':
        if (typeof this.xPosition !== 'number' || !isValidXCoordinate(this.xPosition + 1, this.board)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        ++this.xPosition;
        break;
      case 'SOUTH':
        if (typeof this.yPosition !== 'number' || !isValidYCoordinate(this.yPosition - 1, this.board)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        --this.yPosition;
        break;
      case 'WEST':
        if (typeof this.xPosition !== 'number' || !isValidXCoordinate(this.xPosition - 1, this.board)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        --this.xPosition;
        break;
    }
  };

  left = () : void => {
    this.direction = this.nextDirection('left');
  };

  right = () : void => {
    this.direction = this.nextDirection('right');
  };

  report = () : PositionType => {
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

  private nextDirection = (turnDirection: 'left'|'right') : undefined|DirectionType => {
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
}

export default Robot;
export {
  defaultBoard,
  possibleDirections,
  isRobotPlaced,
  isValidXCoordinate,
  isValidYCoordinate,
  isValidDirection,
  BoardType,
  PositionType,
  DirectionType,
};