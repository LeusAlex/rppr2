import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteContext } from '../FavoriteContext';
import Favourites from '../pages/Favourites';

const mockRemoveFavorite = jest.fn();

const renderWithContext = (favorites) => {
  render(
    <FavoriteContext.Provider value={{ favorites, removeFavorite: mockRemoveFavorite }}>
      <Favourites />
    </FavoriteContext.Provider>
  );
};

test('отображает сообщение при пустом списке', () => {
  renderWithContext([]);
  expect(screen.getByText(/список избранного пуст/i)).toBeInTheDocument();
});

test('отображает товары и удаляет при клике', () => {
  const favorites = [
    { id: '1', name: 'Товар 1', price: 100, quantity: 2 },
  ];
  renderWithContext(favorites);
  expect(screen.getByText(/Товар 1/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/удалить/i));
  expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
});
