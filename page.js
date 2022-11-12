import { auth, db } from "./config.js";
import { signOut , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

let classMaking = document.getElementById("class-making");
let attendance = document.getElementById("attendace-portal");

let signout = document.getElementById("signout");
signout.addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        swal("Signout Succesfull", "", "success");
        window.location = "./index.html";
    }).catch((error) => {
        // An error happened.

    });
});

classMaking.addEventListener("click" , ()=>{
    window.location = "./class.html"
});
attendance.addEventListener("click" , ()=>{
    window.location = "./attendance.html"
});
let student = document.getElementById("student");
student.addEventListener("click" , ()=>{
    window.location = "./student.html"
})
console.log(auth);

onAuthStateChanged(auth, (user) => {
    if (user) {
    const uid = user.uid;
    // ...
    } else {
        window.location = "./index.html";
    }
    });