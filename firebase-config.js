
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOTEgialPdfKlwIH30B4iWQT90QRh6HWA",
  authDomain: "study-mate-bd981.firebaseapp.com",
  projectId: "study-mate-bd981",
  storageBucket: "study-mate-bd981.appspot.com",
  messagingSenderId: "799517746907",
  appId: "1:799517746907:web:30d8e6616235eaf8e9cefe",
  measurementId: "G-8ECMLBWDZ3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
