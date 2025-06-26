import React, { useContext, useCallback } from 'react';
import { FavoriteContext } from '../FavoriteContext';

const FavouriteItem = React.memo(({ item, onRemove }) => {
  console.log('Рендерится item', item.id);
  return (
    <div style={{ border: '1px solid #ccc', margin: 5, padding: 5 }}>
      <h3>{item.name}</h3>
      <p>Количество: {item.quantity}</p>
      <p>Цена: {item.price} ₽</p>
      <button onClick={() => onRemove(item.id)}>Удалить</button>
    </div>
  );
});

const Favourites = () => {
  const { favorites, removeFavorite } = useContext(FavoriteContext);

  const handleRemove = useCallback((id) => {
    removeFavorite(id);
  }, [removeFavorite]);

  if (favorites.length === 0) return <p>Список избранного пуст.</p>;

  return (
    <div>
      <h2>Избранное</h2>
      {favorites.map(item => (
        <FavouriteItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
};

export default Favourites;
