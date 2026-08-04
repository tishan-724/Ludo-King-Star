importScripts('https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCOrzxRn79EcwBFh8myZKJuUkT6g3aTUSc",
  authDomain: "fir-cm-9fd2f.firebaseapp.com",
  projectId: "fir-cm-9fd2f",
  storageBucket: "fir-cm-9fd2f.firebasestorage.app",
  messagingSenderId: "458196100887",
  appId: "1:458196100887:web:6d4b24a2f737592807f952"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || ''
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
