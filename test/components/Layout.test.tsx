import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from '../../src/components/Layout';

describe('<Layout>', () => {
  it('renders a main tag', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('renders it\'s children inside a main tag', () => {
    const { container, getByTestId } = render(<Layout><div data-testid="testChild">testChild</div></Layout>);
    const layoutChild = getByTestId('testChild');
    expect(layoutChild).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});