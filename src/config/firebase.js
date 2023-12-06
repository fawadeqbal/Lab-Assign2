import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVaO72DMOEde6kLMXG5GDvLuGRGZ_8Wfc",
    authDomain: "fir-auth-5c1b2.firebaseapp.com",
    projectId: "fir-auth-5c1b2",
    storageBucket: "fir-auth-5c1b2.appspot.com",
    messagingSenderId: "180486277327",
    appId: "1:180486277327:web:d671f202840533626d4fba"
  };

const app=initializeApp(firebaseConfig)
const db=getFirestore(app)
const auth=getAuth(app)
  
export {db,auth}