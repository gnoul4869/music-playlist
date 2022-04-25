// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCW70hQbuA05imcOVBhXgYq_KtF2cJ2HEc',
    authDomain: 'music-playlist-v1.firebaseapp.com',
    projectId: 'music-playlist-v1',
    storageBucket: 'music-playlist-v1.appspot.com',
    messagingSenderId: '553226028989',
    appId: '1:553226028989:web:f7307c2c45da42609034d4',
    measurementId: 'G-67NXGDF5F8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireAuth = getAuth(app);
const firestore = getFirestore(app);
const fireStorage = getStorage(app);
const analytics = getAnalytics(app);

export { fireAuth, firestore, fireStorage, analytics };
