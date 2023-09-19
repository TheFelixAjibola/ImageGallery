import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwqq7PoJ78AdCFNSivpxy5XLi6mWxzehU",
  authDomain: "imagegalleryfrontend.firebaseapp.com",
  projectId: "imagegalleryfrontend",
  storageBucket: "imagegalleryfrontend.appspot.com",
  messagingSenderId: "409251978083",
  appId: "1:409251978083:web:2112eacb92b3f490305156",
  measurementId: "G-BNFF2NRL5M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default firebase;
