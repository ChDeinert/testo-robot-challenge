import React, { Component, createContext, useContext } from 'react';
import Robot, { defaultBoard, possibleDirections, PositionType } from '../lib/robot';

type RobotContextType = { 
  settings: {
    board,
    possibleDirections,
  },
  state: {
    initialized: boolean,
    isPlaced: boolean,
    position?: PositionType,
    error?,
  },
  controls?: {
    place,
    move,
    turnLeft,
    turnRight,
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
  },
};

const RobotContext = createContext<RobotContextType>(defaultRobotContext);
const useRobotContext = () => useContext(RobotContext);

class RobotProvider extends Component {
  private robot;
  state = {
    initialized: false,
    position: undefined,
    isPlaced: false,
    error: undefined
  };

  componentDidMount() {
    this.robot = new Robot(defaultBoard, possibleDirections);
    this.setState({ initialized: true });
  }

  updateCurrentPosition = () => {
    this.setState({ position: this.robot.report(), error: undefined });
  }

  place = (xCoordinate, yCoordinate, facing) => {
    try {
      this.robot.place(xCoordinate, yCoordinate, facing);
      this.updateCurrentPosition();
      this.setState({ isPlaced: true });
    } catch (error) {
      this.setState({ error });
    }
  }
  move = () => {
    try {
      this.robot.move();
      this.updateCurrentPosition();
    } catch (error) {
      this.setState({ error });
    }
  };
  turnLeft = () => {
    try {
      this.robot.left();
      this.updateCurrentPosition();
    } catch (error) {
      this.setState({ error });
    }
  };
  turnRight = () => {
    try {
      this.robot.right();
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