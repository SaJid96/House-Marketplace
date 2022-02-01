// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCI4kbSG1gqvfWiUNVqkumol_uVe_LxOaE',
  authDomain: 'house-marketplace-app-7961a.firebaseapp.com',
  projectId: 'house-marketplace-app-7961a',
  storageBucket: 'house-marketplace-app-7961a.appspot.com',
  messagingSenderId: '166343558145',
  appId: '1:166343558145:web:83572c39157c9369c62c00',
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()