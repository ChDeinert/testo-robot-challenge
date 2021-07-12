import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from '../../src/components/Board';

describe('<Board />', () => {
  it('renders a section', () => {
    const { container } = render(<Board />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders 25 grid items in default setup', () => {
    render(<Board />);
    const tiles = screen.getAllByTestId(/boardTile../);
    expect(tiles.length).toBe(25);
  });
});