import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyA0RqHgvl5s0Z-KkV_zxs3nDhXBjvuUuAU",
//     authDomain: "collab-3.firebaseapp.com",
//     projectId: "collab-3",
//     storageBucket: "collab-3.appspot.com",
//     messagingSenderId: "1036609728315",
//     appId: "1:1036609728315:web:fe5d221df30df2c786d11e",
//     measurementId: "G-W3KN61PY38",
//     databaseURL: "https://express-server-auth-9b224-default-rtdb.firebaseio.com/"
// };

const firebaseConfig = {
    apiKey: "AIzaSyA0RqHgvl5s0Z-KkV_zxs3nDhXBjvuUuAU",
    authDomain: "collab-3.firebaseapp.com",
    projectId: "collab-3",
    storageBucket: "collab-3.appspot.com",
    messagingSenderId: "1036609728315",
    appId: "1:1036609728315:web:fe5d221df30df2c786d11e",
    measurementId: "G-W3KN61PY38",
    databaseURL: "https://collab-3-default-rtdb.firebaseio.com/"
}


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db };