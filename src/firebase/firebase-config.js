import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBlovvNmsNd6MhVhLyWCAUHODLyxlxaMwg",
  authDomain: "vin-secondhand-market.firebaseapp.com",
  projectId: "vin-secondhand-market",
  storageBucket: "vin-secondhand-market.appspot.com",
  messagingSenderId: "130244932884",
  appId: "1:130244932884:web:675d3224ce98e2112e3e01",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
