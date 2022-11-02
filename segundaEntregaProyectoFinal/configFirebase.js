// import assert from 'assert';
// import admin from 'firebase-admin'
// import {serviceAccount} from './coderhousebackend-f5f84-firebase-adminsdk-rguf4-4448dda2cb.json' assert {type:'json'}

// export async function firebaseConnect() {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//     });

//     console.log('Conectado a Firebase');
// }

// export const dbFirebase = admin.firestore();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "AIzaSyCfUGj-xzGJAf-8b4kcOctlcwwSnsAoNws",
        authDomain: "coderhousebackend-f5f84.firebaseapp.com",
        projectId: "coderhousebackend-f5f84",
        storageBucket: "coderhousebackend-f5f84.appspot.com",
        messagingSenderId: "204504845958",
        appId: "1:204504845958:web:b1fe70191d983221dd0b07",
        measurementId: "G-N3JX62JX2G"
    };

    const app = initializeApp(firebaseConfig);

    export async function firebaseConnect(){
        console.log('Conectado a Firebase');
        return app;
    }

    export const db = getFirestore();
