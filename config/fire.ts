import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAlwXnDEZ4EjOl7BRAsErLbr4nFHtXMXqk",
  authDomain: "saylani-10-12.firebaseapp.com",
  projectId: "saylani-10-12",
  storageBucket: "saylani-10-12.appspot.com",
  messagingSenderId: "1091624763954",
  appId: "1:1091624763954:web:64472ec41ac520ff02322b",
  measurementId: "G-S5ZCDBFGS1"
};

const app = initializeApp(firebaseConfig);



const db = getFirestore(app);
export {db}
