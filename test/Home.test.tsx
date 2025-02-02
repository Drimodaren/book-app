import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/Home.tsx';

test('renders Home component', () => {
  render(<Home />);
  expect(screen.getByText('Welcome to the Home Page!')).toBeInTheDocument();
});
