// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI49vI9_PtIA54YkhFLIJLeosDBQxLzOk",
  authDomain: "blinders-7cb21.firebaseapp.com",
  projectId: "blinders-7cb21",
  storageBucket: "blinders-7cb21.appspot.com",
  messagingSenderId: "603481450368",
  appId: "1:603481450368:web:bf0c917a64bb1f91700365",
  measurementId: "G-5J7D1REJL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getMatches = async () => {
    let output = [];
    const querySnapshot = await getDocs(collection(db, "matchs"));
    querySnapshot.forEach((doc) => {
      output.push(doc.data());
    });
    return output;
}

export const getSpecificMatch = async (addr) => {
  let output = [];
  const matchesRef = collection(db, "matchs");
  const q = query(matchesRef, where("Address", "==", addr));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    output.push(doc.data());
  });
  return output;
}