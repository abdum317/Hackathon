import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMNyf5hEZbTcbtj5D9ynSJjWlXboUw61s",
    authDomain: "hackathon-322.firebaseapp.com",
    projectId: "hackathon-322",
    storageBucket: "hackathon-322.appspot.com",
    messagingSenderId: "700286655637",
    appId: "1:700286655637:web:0c318c4caed5a488b04f9c",
    measurementId: "G-W4LVXHRBVP"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
