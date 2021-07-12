import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Index from '../../src/pages';

describe('<Index Page/>', () => {
  it('renders correctly', () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });
});