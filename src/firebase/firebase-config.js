import { initializeApp } from "firebase/app";
import axios from 'axios';
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
  const baseUrl = 'https://swdprojectapi.azurewebsites.net/api';

  async function fetchJwtToken(email) {
    const url = `${baseUrl}/accounts/login`;
    const data = JSON.stringify({ email });
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const { accessToken, id, role } = response.data;
        // Làm gì đó với accessToken, id và role
        console.log(accessToken, id, role);
        return accessToken;
      } else {
        throw new Error(`Failed to fetch JWT token ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Failed to fetch JWT token: ${error.message}`);
    }
  }
  
  // Sử dụng hàm fetchJwtToken
  const email = 'example@email.com'; // Thay thế bằng email thực tế
  fetchJwtToken(email)
    .then(accessToken => {
      console.log(`JWT Token: ${accessToken}`);
      // Tiếp tục xử lý sau khi có accessToken
    })
    .catch(error => {
      console.error(error.message);
    });
  export const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const email = result.user.email;
        const displayName = result.user.displayName;
        const photoURL = result.user.photoURL;
  
        // Gọi hàm fetchJwtToken(email) để lấy JWT token từ máy chủ
        fetchJwtToken(email)
          .then((jwtToken) => {
            // Ở đây bạn có thể sử dụng jwtToken theo nhu cầu của mình
            console.log(jwtToken);
          })
          .catch((error) => {
            // Xử lý lỗi khi lấy JWT token
            console.error(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const customDataEmail = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Xử lý lỗi khi đăng nhập
        console.error(error);
      });
  };
  
