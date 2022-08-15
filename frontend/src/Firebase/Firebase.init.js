// import React from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from './Firebase.config';

const InitializeFirebase =()=>{
    initializeApp(firebaseConfig);
}

export default InitializeFirebase;