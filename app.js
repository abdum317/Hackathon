import { auth } from "./config.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
let click = document.getElementById("click");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loading = document.getElementById("loading");
click.addEventListener("click", () => {
  loading.style.display = "block";
  click.style.display = "none";
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
      window.location = "./page.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      loading.style.display = "none";
      click.style.display = "block";
      swal("please Register First");
    });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
  }
});