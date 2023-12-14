// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfzq5C2K7yS_djPtfBZR8iVvhBmnhced4',
  authDomain: 'gallery-ad576.firebaseapp.com',
  projectId: 'gallery-ad576',
  storageBucket: 'gallery-ad576.appspot.com',
  messagingSenderId: '504614323334',
  appId: '1:504614323334:web:4ce54732a945b2a9e5bd07'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, auth, storage };
