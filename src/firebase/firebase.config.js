
// // import { initializeApp } from "firebase/app";
// // // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth";


// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_API_KEY,
// //   authDomain: import.meta.env.VITE_Auth_Domain,
// //   projectId: import.meta.env.VITE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,  
// //   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
// //   appId: import.meta.env.VITE_APPID,
// // };


// // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);
// // export const auth = getAuth(app); 





// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // ✅ Debug logs to verify env variables
// console.log("🔥 Firebase Config Debug:");
// console.log("API KEY:", import.meta.env.VITE_API_KEY);
// console.log("Auth Domain:", import.meta.env.VITE_Auth_Domain);
// console.log("Project ID:", import.meta.env.VITE_PROJECT_ID);
// console.log("Storage Bucket:", import.meta.env.VITE_STORAGE_BUCKET);
// console.log("Sender ID:", import.meta.env.VITE_MESSAGING_SENDERID);
// console.log("App ID:", import.meta.env.VITE_APPID);

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_Auth_Domain,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
//   appId: import.meta.env.VITE_APPID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);





import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_Auth_Domain,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);