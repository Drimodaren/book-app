import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/store.ts';
import App from '../src/App.tsx';

test('renders App component and navigates', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Авторизация')).toBeInTheDocument();
});
