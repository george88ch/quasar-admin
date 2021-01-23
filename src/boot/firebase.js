import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDs4vGBWxft5--Lj00RlWtrqM7xp-6eTZ4",
  authDomain: "scontrol-d4694.firebaseapp.com",
  projectId: "scontrol-d4694",
  storageBucket: "scontrol-d4694.appspot.com",
  messagingSenderId: "651617581016",
  appId: "1:651617581016:web:cec63aeca2f3af4d6c24ad",
  measurementId: "G-K8BX8CGMYN"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("Auth user", user);
  } else {
    console.log("Auth no user", user);
  }
});

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
