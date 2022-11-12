import { auth, db, storage } from "./config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, doc, getDocs, query, where, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

let list = document.getElementById("list");

function getData() {
    let classDetail = collection(db, "classDetail");
    // console.log(auth.currentUser.uid);
    getDocs(classDetail)
        .then((items) => {
            items.docs.forEach(doc => {
                // console.log(doc.data());
                list.innerHTML = list.innerHTML +
                    `
                <li onclick = "selects('${doc.data().TeacherName}')">
                ${doc.data().TeacherName + " " + doc.data().schedules + " " + doc.data().timing}
            </li>
                `
            });
        })
}
getData();

function selects(d) {
    localStorage.setItem("TeacherName" , d);
    window.location = "./attendance.html"
}

window.selects = selects;