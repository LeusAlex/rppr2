import React, { useEffect, useState } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function beforeInstallHandler(e) {
      e.preventDefault(); // предотвратить автоматический показ
      setDeferredPrompt(e);
      setShowButton(true);
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    window.addEventListener('appinstalled', () => {
      console.log('PWA успешно установлено');
      setShowButton(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('Пользователь принял установку');
    } else {
      console.log('Пользователь отклонил установку');
    }
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button onClick={handleInstallClick} style={{ position: 'fixed', bottom: 20, right: 20 }}>
      Установить приложение
    </button>
  );
};

export default InstallPrompt;
