import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Controls from "../../src/components/Controls";
import RobotContext from "../../src/context/RobotContext";
import { defaultBoard, possibleDirections } from "../../src/lib/robot";

describe('<Controls />', () => {
  it('renders a loading indication if Robot is not initialized in context', async () => {
    render(<Controls />);
    const placeForm = screen.getByText('loading...');
    expect(placeForm).toMatchInlineSnapshot(`
      <p>
        loading...
      </p>
    `);
  });

  it('renders the place form if Robot is initialized in context', () => {
    const testContext = {
      settings: {
        board: defaultBoard,
        possibleDirections: possibleDirections,
      },
      state: {
        initialized: true,
        isPlaced: false,
        position: {
          xPosition: 0,
          yPosition: 0,
          direction: possibleDirections[0],
        },
      },
    };
    render(
      <RobotContext.Provider value={testContext}>
        <Controls />
      </RobotContext.Provider>
    );
    const placeForm = screen.getByTestId('robotplaceform');
    expect(placeForm).toMatchSnapshot();
  });

  it('renders the robot control if Robot is initialized in context', () => {
    const testContext = {
      settings: {
        board: defaultBoard,
        possibleDirections: possibleDirections,
      },
      state: {
        initialized: true,
        isPlaced: false,
        position: {
          xPosition: 0,
          yPosition: 0,
          direction: possibleDirections[0],
        },
      },
    };
    render(
      <RobotContext.Provider value={testContext}>
        <Controls />
      </RobotContext.Provider>
    );
    const placeForm = screen.getByTestId('robotcontrolbuttons');
    expect(placeForm).toMatchSnapshot();
  });
});
