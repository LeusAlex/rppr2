import React, { useContext, useCallback } from 'react';
import { FavoriteContext } from '../FavoriteContext';

const products = [
  { id: '1', name: 'Товар 1', price: 100, quantity: 1 },
  { id: '2', name: 'Товар 2', price: 200, quantity: 1 },
  { id: '3', name: 'Товар 3', price: 300, quantity: 1 },
];

const Product = React.memo(({ product, onAdd }) => {
  console.log('Рендерится продукт', product.id);
  return (
    <div style={{ border: '1px solid #ddd', margin: 5, padding: 5 }}>
      <h3>{product.name}</h3>
      <p>Цена: {product.price} ₽</p>
      <button onClick={() => onAdd(product)}>Добавить в избранное</button>
    </div>
  );
});

const Home = () => {
  const { addFavorite } = useContext(FavoriteContext);

  const handleAdd = useCallback((product) => {
    addFavorite(product);
  }, [addFavorite]);

  return (
    <div>
      <h2>Каталог товаров</h2>
      {products.map(product => (
        <Product key={product.id} product={product} onAdd={handleAdd} />
      ))}
    </div>
  );
};

export default Home;
