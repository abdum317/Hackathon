import { auth, db } from "./config.js";
import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection , addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";





let teacher = document.getElementById("teacher");
let schedule = document.getElementById("schedule");
let timings = document.getElementById("timings");
let section = document.getElementById("section");
let courseName = document.getElementById("courseName");
let batch = document.getElementById("batch");
let button = document.getElementById("button");
let allClasses = document.getElementById("all-classes");

function checkUserLoc() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            getResult(user)
        } else {
            // User is signed out
            // ...
            signOut(auth).then(() => {
                // Sign-out successful.
                // alert("Sign-out successful.");
                window.location = "./index.html";
            }).catch((error) => {
                // An error happened.

            });
        }
    });
}
checkUserLoc()



button.addEventListener("click",async ()=>{
    // console.log(teacher.value);
    // console.log(schedule.value);
    // console.log(timings.value);
    // console.log(section.value);
    // console.log(courseName.value);
    // console.log(batch.value);

    let classDetail = collection(db, "classDetail");
    await addDoc(classDetail, { TeacherName: teacher.value, schedules: schedule.value, timing:timings.value, sections:section.value , courseName : courseName.value , batch: batch.value});
    teacher.value = "";
    schedule.value = "";
    timings.value = "";
    section.value = "";
    courseName.value = "";
    batch.value = "";

    swal("Good job!", "New Class Added!", "success");
})

allClasses.addEventListener("click" , ()=>{
    window.location = "./allclasses.html"
})