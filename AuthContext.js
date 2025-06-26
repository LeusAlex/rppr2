import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

const TOKEN_KEY = 'jwt_token';
const USERNAME_KEY = 'username';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [userName, setUserName] = useState(() => localStorage.getItem(USERNAME_KEY));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Проверка валидности токена (упрощённо, обычно проверяют expiry)
  const validateToken = useCallback((token) => {
    // Для примера считаем любой непустой токен валидным
    return !!token;
  }, []);

  useEffect(() => {
    if (token && validateToken(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USERNAME_KEY);
      setToken(null);
      setUserName(null);
    }
  }, [token, validateToken]);

  const login = async (email, password) => {
    // Пример запроса, замените URL и тело согласно API
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Неверный логин или пароль');
    }

    const data = await response.json();
    // Предполагается, что сервер возвращает { token: '...', username: '...' }
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USERNAME_KEY, data.username);
    setToken(data.token);
    setUserName(data.username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setToken(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, userName, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
