// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyDjZbc4llYClzZPAxOhFul8EZ3CwRknv4g",
//   authDomain: "schedulion96754.firebaseapp.com",
//   projectId: "schedulion96754",
//   storageBucket: "schedulion96754.appspot.com",
//   messagingSenderId: "109570177961",
//   appId: "1:109570177961:web:15689c4ddf7d716bdce2b8",
//   measurementId: "G-3XNMF95Q5F"
// };
// const app = firebase.initializeApp(firebaseConfig);
// const auth = app.auth();
// const db = app.firestore();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     const user = res.user;
//     await db.collection("users").add({
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   auth.signOut();
// };
// export {
//   auth,
//   db,
//   signInWithGoogle,
//   signInWithEmailAndPassword,
//   registerWithEmailAndPassword,
//   sendPasswordResetEmail,
//   logout,
// };
