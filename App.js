import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavoriteProvider } from './FavoriteContext';

const Home = lazy(() => import('./pages/Home'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Cart = lazy(() => import('./pages/Cart'));

const App = () => {
  return (
    <FavoriteProvider>
      <Router>
        <nav>
          <Link to="/">Главная</Link> | <Link to="/favourites">Избранное</Link> | <Link to="/cart">Корзина</Link>
        </nav>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </Router>
    </FavoriteProvider>
  );
};

export default App;
