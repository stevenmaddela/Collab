import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8IJteM2Rk-ebhItKHSnDwB88D-5KO8Kc",
    authDomain: "express-server-auth-9b224.firebaseapp.com",
    projectId: "express-server-auth-9b224",
    storageBucket: "express-server-auth-9b224.appspot.com",
    messagingSenderId: "896190740296",
    appId: "1:896190740296:web:6467b72b73dedc80dae57d",
    databaseURL: "https://express-server-auth-9b224-default-rtdb.firebaseio.com/"
};

// PERSONAL TESTING 
// const firebaseConfig = {
//     apiKey: "AIzaSyA0RqHgvl5s0Z-KkV_zxs3nDhXBjvuUuAU",
//     authDomain: "collab-3.firebaseapp.com",
//     projectId: "collab-3",
//     storageBucket: "collab-3.appspot.com",
//     messagingSenderId: "1036609728315",
//     appId: "1:1036609728315:web:fe5d221df30df2c786d11e",
//     measurementId: "G-W3KN61PY38",
//     databaseURL: "https://collab-3-default-rtdb.firebaseio.com/"
// }


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db };