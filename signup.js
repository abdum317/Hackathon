import { auth, db, storage } from "./config.js";
import { createUserWithEmailAndPassword , sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let button = document.getElementById("button");
let loading = document.getElementById("loading");

// console.log(auth);



button.addEventListener("click", () => {
  loading.style.display = "block";
  button.style.display = "none";
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      button.style.display = "none";
      loading.style.display = "block";
      const user = userCredential.user;
      console.log(user);


      let userDetail = collection(db, "UserDetail");
      await addDoc(userDetail, { name: fullName.value, email: email.value, UID: auth.currentUser.uid, time: Timestamp.fromDate(new Date()) });

      // verifyEmail() 


      window.location = "./index.html"

    })
    // async function verifyEmail() {
    //   await sendEmailVerification(auth.currentUser);
    //   console.log('please check your email address and confirm.')
    // }

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      loading.style.display = "none";
      button.style.display = "block";
      swal("Please give the correct value");
    });
});

