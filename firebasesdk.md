// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDwqq7PoJ78AdCFNSivpxy5XLi6mWxzehU",
authDomain: "imagegalleryfrontend.firebaseapp.com",
projectId: "imagegalleryfrontend",
storageBucket: "imagegalleryfrontend.appspot.com",
messagingSenderId: "409251978083",
appId: "1:409251978083:web:2112eacb92b3f490305156",
measurementId: "G-BNFF2NRL5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
