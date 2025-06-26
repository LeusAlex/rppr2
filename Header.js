import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, userName, logout } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkMessage, setNetworkMessage] = useState('');

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      setNetworkMessage('Соединение восстановлено');
      setTimeout(() => setNetworkMessage(''), 3000);
    }
    function handleOffline() {
      setIsOnline(false);
      setNetworkMessage('Вы в офлайне');
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {isAuthenticated ? (
        <>
          <span>Привет, {userName}!</span>{' '}
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
      {networkMessage && (
        <div style={{ marginTop: 5, color: isOnline ? 'green' : 'red' }}>
          {networkMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
