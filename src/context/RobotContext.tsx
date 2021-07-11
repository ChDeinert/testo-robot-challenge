import React, { Component, createContext, useContext } from 'react';
import Robot, { defaultBoard, possibleDirections, DirectionType, BoardType } from '../lib/robot';

type RobotContextType = { 
  settings: {
    board: BoardType,
    possibleDirections: DirectionType[],
  },
  state: {
    initialized: boolean,
    isPlaced: boolean,
    position: { xPosition: number, yPosition: number, direction: DirectionType },
    error?: Error,
  },
  controls?: {
    place: (xCoordinate: number, yCoordinate: number, direction: DirectionType) => void,
    move: () => void,
    turnLeft: () => void,
    turnRight: () => void,
  },
};
const defaultRobotContext : RobotContextType = {
  settings: {
    board: defaultBoard,
    possibleDirections: possibleDirections,
  },
  state: {
    initialized: false,
    isPlaced: false,
    position: { xPosition: 0, yPosition: 0, direction: possibleDirections[0] },
  },
};

const RobotContext = createContext<RobotContextType>(defaultRobotContext);
const useRobotContext = () => useContext(RobotContext);

class RobotProvider extends Component {
  private robot ?: Robot;
  state = {
    initialized: false,
    position: { xPosition: 0, yPosition: 0, direction: possibleDirections[0] },
    isPlaced: false,
    error: undefined
  };

  componentDidMount() {
    this.robot = new Robot(defaultBoard, possibleDirections);
    this.setState({ initialized: true });
  }

  updateCurrentPosition = () => {
    this.setState({ position: this.robot?.report(), error: undefined });
  }

  place = (xCoordinate: number, yCoordinate: number, facing: DirectionType) => {
    try {
      this.robot?.place(xCoordinate, yCoordinate, facing);
      this.updateCurrentPosition();
      this.setState({ isPlaced: true });
    } catch (error) {
      this.setState({ error });
    }
  }
  move = () => {
    try {
      this.robot?.move();
      this.updateCurrentPosition();
    } catch (error) {
      this.setState({ error });
    }
  };
  turnLeft = () => {
    try {
      this.robot?.left();
      this.updateCurrentPosition();
    } catch (error) {
      this.setState({ error });
    }
  };
  turnRight = () => {
    try {
      this.robot?.right();
      this.updateCurrentPosition();
    } catch (error) {
      this.setState({ error });
    }
  };

  render() { 
    const { children } = this.props;
    const { initialized, position, isPlaced, error } = this.state;

    return (
      <RobotContext.Provider value={{ 
        settings: { board: defaultBoard, possibleDirections: possibleDirections },
        state: {
          initialized,
          isPlaced,
          position,
          error,
        },
        controls: {
          place: this.place,
          move: this.move,
          turnLeft: this.turnLeft,
          turnRight: this.turnRight,
        }
      }}>
        {children}
      </RobotContext.Provider>
    );
  }
}

export default RobotContext;
export { RobotProvider, useRobotContext };