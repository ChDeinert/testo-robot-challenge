import React, { Component, createContext, useContext } from 'react';
import Robot, { defaultBoard, possibleDirections, DirectionType, BoardType, PositionType } from '../lib/robot';

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
    report: () => undefined|PositionType,
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

/**
 * React component rendering the RobotContext provider,
 * it's setting, state and control-methods
 */
class RobotProvider extends Component {
  private robot?: Robot;
  state = {
    initialized: false,
    position: { xPosition: 0, yPosition: 0, direction: possibleDirections[0] },
    isPlaced: false,
    error: undefined
  };

  componentDidMount() {
    // Initialize the Robot only after the component is mounted
    // so that ssr/prerender aren't effected by any instance of Robot
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

  report = () => {
    try {
      const currentPositionReport = this.robot?.report();
      alert(`The Robot's current position: ${currentPositionReport}`);
      return currentPositionReport;
    } catch (error) {
      this.setState({ error });
    }
  }

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
          report: this.report,
        }
      }}>
        {children}
      </RobotContext.Provider>
    );
  }
}

export default RobotContext;
export { RobotProvider, useRobotContext };