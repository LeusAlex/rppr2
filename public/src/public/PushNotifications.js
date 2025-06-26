import React, { useState } from 'react';

const PushNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [subscription, setSubscription] = useState(null);

  const askPermission = async () => {
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      if (permissionResult === 'granted') {
        subscribeUser();
      }
    } catch (err) {
      console.error('Ошибка запроса разрешения:', err);
    }
  };

  const subscribeUser = async () => {
    if (!('serviceWorker' in navigator)) {
      console.error('Service Worker не поддерживается');
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    try {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('<ВАШ_PUBLIC_VAPID_KEY>') // см. ниже
      });
      console.log('Подписка на push:', sub);
      setSubscription(sub);
      // Отправьте sub на ваш сервер для отправки пушей
    } catch (err) {
      console.error('Ошибка подписки:', err);
    }
  };

  // Вспомогательная функция для преобразования ключа VAPID
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i)
      outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }

  return (
    <div>
      <p>Разрешение на уведомления: {permission}</p>
      {permission !== 'granted' && (
        <button onClick={askPermission}>Разрешить уведомления</button>
      )}
      {subscription && <pre>{JSON.stringify(subscription)}</pre>}
    </div>
  );
};

export default PushNotifications;
