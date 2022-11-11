import { auth , db , storage } from "./config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let button = document.getElementById("button")

// console.log(auth);



button.addEventListener("click",() => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        
        
        let userDetail = collection(db, "UserDetail");
        await addDoc(userDetail, { name: fullName.value,email: email.value, UID: auth.currentUser.uid, time: Timestamp.fromDate(new Date()) });
        window.location = "./index.html";
    })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        swal("Please give the correct value");
      });
  });

