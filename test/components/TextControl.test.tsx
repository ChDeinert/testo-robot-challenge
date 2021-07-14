import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextControl from "../../src/components/TextControl";
import RobotContext from "../../src/context/RobotContext";
import { defaultBoard, possibleDirections } from "../../src/lib/robot";

describe('<TextControl />', () => {
  it('renders a loading indication if Robot is not initialized in context', async () => {
    render(<TextControl />);
    const placeForm = screen.getByText('loading...');
    expect(placeForm).toMatchInlineSnapshot(`
      <p>
        loading...
      </p>
    `);
  });

  it('renders the command form', () => {
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
        <TextControl />
      </RobotContext.Provider>
    );
    const placeForm = screen.getByTestId('robotcommandform');
    expect(placeForm).toMatchSnapshot();
  });
});
