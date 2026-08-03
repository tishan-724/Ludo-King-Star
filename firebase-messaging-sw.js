importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCpmOvo5nw-Uy4ZQb4rMjNvfZ8fshspBg4",
  authDomain: "ludo-fb862.firebaseapp.com",
  projectId: "ludo-fb862",
  storageBucket: "ludo-fb862.firebasestorage.app",
  messagingSenderId: "438684773049",
  appId: "1:438684773049:web:015b92b8b267455ecb4968"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[FCM] Background message:", payload);

  const title = (payload.notification && payload.notification.title) ||
                (payload.data && payload.data.title) ||
                "Ludo King Star";

  const body  = (payload.notification && payload.notification.body) ||
                (payload.data && payload.data.body) ||
                "";

  const options = {
    body: body,
    icon: "https://i.postimg.cc/ydRrgLk5/IMG-20260802-174738-112.jpg",
    badge: "https://i.postimg.cc/ydRrgLk5/IMG-20260802-174738-112.jpg",
    data: payload.data || {},
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
