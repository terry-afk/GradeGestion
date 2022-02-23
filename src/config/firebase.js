import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMrI9gWLW0zVUcsnNvV1JLaVIZeWRER-4",
  authDomain: "gradegestion-ff867.firebaseapp.com",
  projectId: "gradegestion-ff867",
  storageBucket: "gradegestion-ff867.appspot.com",
  messagingSenderId: "755215722149",
  appId: "1:755215722149:web:402a29064913fab3becf4c",
  measurementId: "G-W8Q9XSSSNY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export default app;