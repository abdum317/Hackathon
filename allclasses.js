
import { auth, db } from "./config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, doc, getDocs, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";




onAuthStateChanged(auth, (user) => {
    if (user) {
    const uid = user.uid;
    // ...
    } else {
        window.location = "./index.html";
    }
    });




let list = document.getElementById("list");


async function getData(user) {
    let allClasses = collection(db, "classDetail");
    const docSnaps = await getDocs(allClasses)
        .then((items) => {
            items.docs.forEach(doc => {
                console.log(doc.data());
                list.innerHTML = list.innerHTML +
                    `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="py-4 px-6">${doc.data().TeacherName}</td>
            <td class="py-4 px-6">${doc.data().courseName}</td>
            <td class="py-4 px-6">${doc.data().schedules}</td>
            <td class="py-4 px-6">${doc.data().sections}</td>
            <td class="py-4 px-6">${doc.data().timing}</td>
            <td class="py-4 px-6">                        <button onclick="deletes()" style="background-color: rgb(145, 43, 43);color: white; width: 3.5rem; border-radius: 0.3rem;">Delete</button></td>
            </tr>
            `
            });
        })


}
getData();
let signout = document.getElementById("signout");
signout.addEventListener("click", () => {
    signOut(auth).then(async () => {
        // Sign-out successful.
        await swal("Signout Succesfull", "", "success");
        window.location = "./index.html";
    }).catch((error) => {
        // An error happened.

    });
});
// function deletes(){
//     console.log("abc");
// }