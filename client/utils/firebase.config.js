 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1yRUU1zD1fTSV21wL01HO_HsJGfzDEyE",
  authDomain: "chatapp-ad23b.firebaseapp.com",
  projectId: "chatapp-ad23b",
  storageBucket: "chatapp-ad23b.appspot.com",
  messagingSenderId: "1039491041143",
  appId: "1:1039491041143:web:c587d51e93c6dc7d1e4372",
  measurementId: "G-FNBLX4NFTK"
};

 
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

 