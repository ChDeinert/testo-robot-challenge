type BoardType = { xWidth: number, yWidth: number };
type DirectionType = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
type PositionType = { xPosition?: number, yPosition?: number, direction?: DirectionType, toString?: () => string };

/**
 * Represents the default Board that the Robot can be placed on
 */
const defaultBoard : BoardType = {
  xWidth: 5,
  yWidth: 5,
};

/**
 * Array containing the possible directions the robot can be facing
 */
const possibleDirections = [
  'NORTH' as DirectionType, 'EAST' as DirectionType, 'SOUTH' as DirectionType, 'WEST' as DirectionType
];

/**
 * Represents the Robot on the board,
 * it's containing the logic and provides the methods to control it
 */
class Robot {
  private board: BoardType;
  private possibleDirections : DirectionType[];
  private xPosition?: number;
  private yPosition?: number;
  private direction?: DirectionType;

  constructor(board: BoardType, possibleDirections: DirectionType[]) {
    this.board = board;
    this.possibleDirections = possibleDirections;
  }

  /**
   * Validates if a given x Coordinate is a valid one
   */
  private isValidXCoordinate = (xCoordinate: number) : boolean => {
    if (typeof xCoordinate !== 'number' || isNaN(xCoordinate) || xCoordinate < 0 || xCoordinate >= this.board.xWidth) {
      return false;
    }

    return true;
  };

  /**
   * Validates if a given y Coordinate is a valid one
   */
  private isValidYCoordinate = (yCoordinate: number) : boolean => {
    if (typeof yCoordinate !== 'number' || isNaN(yCoordinate) || yCoordinate < 0 || yCoordinate >= this.board.yWidth) {
      return false;
    }

    return true;
  };

  /**
   * Validates if a given direction string is a valid one
   */
  private isValidDirection = (direction: DirectionType) : boolean => {
    if (typeof direction !== 'string' || !this.possibleDirections.includes(direction)) {
      return false;
    }

    return true;
  };

  /**
   * Validates if the robot is positioned on the board
   */
  private isRobotPlaced = (xCoordinate?: number, yCoordinate?: number, direction?: DirectionType) : boolean => {
    if (typeof xCoordinate !== 'number' || !this.isValidXCoordinate(xCoordinate) || 
        typeof yCoordinate !== 'number' || !this.isValidYCoordinate(yCoordinate) || 
        typeof direction === 'string' && !this.isValidDirection(direction)) {
      return false;
    }

    return true;
  };

  /**
   * Returns the next facing direction of the Robot depending on the turning direction and it's current facing direction
   * 
   * @throws Error - Errors if the Coordinates or Direction are invalid
   */
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

  /**
   * Placing the Robot on the Board on the given Coordinates and facing the given direction
   * 
   * @throws Error - Errors if the Coordinates or Direction are invalid
   */
  place = (x: number, y: number, facing: DirectionType) : void => {
    if (!this.isValidXCoordinate(x)) {
      throw new Error('X Coordinate is invalid');
    }
    if (!this.isValidYCoordinate(y)) { 
      throw new Error('Y Coordinate is invalid');
    }
    if (!this.isValidDirection(facing)) {
      throw new Error('The given direction, the Robot is facing, is invalid');
    }

    this.xPosition = x;
    this.yPosition = y;
    this.direction = facing;
  };

  /**
   * Moves the robot on the Board
   * 
   * @throws Error - Errors if the Robot is not placed yet or the new Coordinates are out of bounds
   */
  move = () : void => {
    if (!this.isRobotPlaced(this.xPosition, this.yPosition, this.direction)) {
      throw new Error('The robot is not placed yet');
    }

    switch (this.direction) {
      case 'NORTH':
        if (typeof this.yPosition !== 'number' || !this.isValidYCoordinate(this.yPosition + 1)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        ++this.yPosition;
        break;
      case 'EAST':
        if (typeof this.xPosition !== 'number' || !this.isValidXCoordinate(this.xPosition + 1)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        ++this.xPosition;
        break;
      case 'SOUTH':
        if (typeof this.yPosition !== 'number' || !this.isValidYCoordinate(this.yPosition - 1)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        --this.yPosition;
        break;
      case 'WEST':
        if (typeof this.xPosition !== 'number' || !this.isValidXCoordinate(this.xPosition - 1)) {
          throw new Error('The robot can\'t move in that direction, or it falls down');
        }
        --this.xPosition;
        break;
    }
  };

  /**
   * Turnes the Robot to the left (counter clockwise)
   */
  left = () : void => {
    this.direction = this.nextDirection('left');
  };

  /**
   * Turnes the Robot to the right (clockwise)
   */
  right = () : void => {
    this.direction = this.nextDirection('right');
  };

  /**
   * Reports the Robot's current position
   * 
   * @throws Error - Errors if the Robot is not placed yet
   */
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
}

export default Robot;
export {
  defaultBoard,
  possibleDirections,
  BoardType,
  PositionType,
  DirectionType,
};