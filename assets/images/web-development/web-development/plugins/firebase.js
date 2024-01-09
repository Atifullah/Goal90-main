// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZv_IhPIZYhLRDoJpO_kmN-_qNFWXIUao",
    authDomain: "bitnasdaq.firebaseapp.com",
    projectId: "bitnasdaq",
    storageBucket: "bitnasdaq.appspot.com",
    messagingSenderId: "311638269948",
    appId: "1:311638269948:web:dd0f0b8f96a39b46f39c79",
    measurementId: "G-96SVBPJJ0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//console.log('google anylytics: ', analytics)