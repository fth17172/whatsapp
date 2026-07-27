// Arka Planda Çalışan Servis
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    return self.clients.claim();
});

// Arka Planda Push Bildirimi Geldiğinde
self.addEventListener('push', (e) => {
    const data = e.data ? e.data.json() : {};

    const options = {
        body: data.body || 'Seni arıyor!',
        icon: 'https://cdn-icons-png.flaticon.com/512/3059/3059502.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3059/3059502.png',
        vibrate: [200, 100, 200, 100, 200], // Titreşim efekti
        data: { url: '/' }
    };

    e.waitUntil(
        self.registration.showNotification(data.title || 'Gelen Arama!', options)
    );
});

// Bildirime Tıklandığında Uygulamayı Aç
self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
