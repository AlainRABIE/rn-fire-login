// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfVcysT4z4UYafcbVCjnHNzdYDxASKQ9A",
  authDomain: "expenses-project-a470e.firebaseapp.com",
  projectId: "expenses-project-a470e",
  storageBucket: "expenses-project-a470e.firebasestorage.app",
  messagingSenderId: "607134233896",
  appId: "1:607134233896:web:2c01273a05a31fe63d0c1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);