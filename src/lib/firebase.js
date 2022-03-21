import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"; 

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAzB6S1Qq8q2XW6nIFvKLi0tBddOzakP80',
    authDomain: 'kitter-a1eab.firebaseapp.com',
    projectId: 'kitter-a1eab',
    storageBucket: 'kitter-a1eab.appspot.com',
    messagingSenderId: '881521869616',
    appId: '1:881521869616:web:aac1311bd457e483c2bef5',
    measurementId: 'G-RY9FW6YWJ5',
  };
  initializeApp(firebaseConfig);
  const autenticacion = getAuth();
  const db = getFirestore();

  return {autenticacion, db};
};

// export const db = () => {
//   return getFirestore(firebaseApp);
// }

