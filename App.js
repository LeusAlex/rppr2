import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Header from './Header';

const LoginPage = lazy(() => import('./LoginPage'));
const HomePage = lazy(() => import('./HomePage')); // Ваша главная страница

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            {/* Добавьте другие защищённые маршруты */}
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
