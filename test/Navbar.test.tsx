import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar.tsx';

test('renders Navbar and navigates', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <Navbar />
    </MemoryRouter>,
  );

  const booksLink = screen.getByText('Книги');
  const statisticsLink = screen.getByText('Статистика');
  const logoutButton = screen.getByText('Выйти');

  fireEvent.click(booksLink);
  expect(screen.getByText('Книги')).toBeInTheDocument();

  fireEvent.click(statisticsLink);
  expect(screen.getByText('Статистика')).toBeInTheDocument();

  fireEvent.click(logoutButton);
  expect(screen.getByText('Войти')).toBeInTheDocument();
});
