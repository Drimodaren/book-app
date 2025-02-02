import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthorizationPage from '../src/pages/AuthorizationPage.tsx';
import '@testing-library/jest-dom';

test('renders AuthorizationPage and handles login', () => {
  render(
    <MemoryRouter>
      <AuthorizationPage />
    </MemoryRouter>,
  );

  const usernameInput = screen.getByPlaceholderText('имя для входа admin');
  const passwordInput = screen.getByPlaceholderText('пароль для входа 1234');
  const loginButton = screen.getByText('Войти');

  fireEvent.change(usernameInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: '1234' } });
  fireEvent.click(loginButton);

  expect(screen.getByText('Успешный вход!')).toBeInTheDocument();
});
