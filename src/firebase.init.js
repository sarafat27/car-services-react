// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADW_2pL9dmIFGmDZvV_SmRq_-haRAykbo",
    authDomain: "genius-car--services-a2406.firebaseapp.com",
    projectId: "genius-car--services-a2406",
    storageBucket: "genius-car--services-a2406.appspot.com",
    messagingSenderId: "942196753779",
    appId: "1:942196753779:web:c2bc9d0b92673fe0327106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth;