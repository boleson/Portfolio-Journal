import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDaSheucD3HIwSp4fMPADHNPW4sZwr4yDs",
    authDomain: "boluwatife-trading-journal.firebaseapp.com",
    projectId: "boluwatife-trading-journal",
    storageBucket: "boluwatife-trading-journal.firebasestorage.app",
    messagingSenderId: "586771630102",
    appId: "1:586771630102:web:f3bef2fc7dfd14ddd00d37",
    measurementId: "G-Q2Q6ZK7J54"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);