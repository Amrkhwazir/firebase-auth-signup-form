import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCFpbWwmh09YMwo8EE7MGeg9KAVN5naHcs",
  authDomain: "signup-form-cadc3.firebaseapp.com",
  projectId: "signup-form-cadc3",
  storageBucket: "signup-form-cadc3.appspot.com",
  messagingSenderId: "219653567561",
  appId: "1:219653567561:web:a6c333de827309adcc3b98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// input Fields
const firstName = document.querySelector("#firstName"); 
const lastName = document.querySelector("#lastName");
const phoneNumber = document.querySelector("#phoneNumber");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// buttons
const btn = document.querySelector("#btn"); 


//  signup fucntion
function signupHandler(){

createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    if(user){

      console.log(user, "user sign in")
      userSignupHandler(user)
    }
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, "user not found")
  });

}

btn.addEventListener("click", signupHandler);


async function userSignupHandler(userId){
try {
  const docRef = await addDoc(collection(db, "users", userId), {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value
  });

  window.location.href = './login/login.html'
  console.log("Document written with ID: ", docRef.id);

} catch (e) {
  console.error("Error adding document: ", e);
}
}