import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBlovvNmsNd6MhVhLyWCAUHODLyxlxaMwg",
  authDomain: "vin-secondhand-market.firebaseapp.com",
  projectId: "vin-secondhand-market",
  storageBucket: "vin-secondhand-market.appspot.com",
  messagingSenderId: "130244932884",
  appId: "1:130244932884:web:675d3224ce98e2112e3e01",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
