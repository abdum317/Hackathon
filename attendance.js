import { auth, db, storage } from "./config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, doc, getDocs, query, where, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";










let search = document.getElementById("search");
let button = document.getElementById("button");
let profile = document.getElementById("profile");
let rollNumber = document.getElementById("roll");
let name = document.getElementById("name");
let section = document.getElementById("section");
let signout = document.getElementById("signout");
let mark = document.getElementById("mark");
let select = document.getElementById("select");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        // ...
    } else {
        window.location = "./index.html";
    }
});

signout.addEventListener("click", () => {
    signOut(auth).then(async () => {
        // Sign-out successful.
        await swal("Signout Succesfull", "", "success");
        window.location = "./index.html";
    }).catch((error) => {
        // An error happened.

    });
});



button.addEventListener("click", () => {
    const regex = /\S+/;
    if (!search.value.match(regex)) {
        swal("please enter correct roll Number");
    }else{

    
    // let names = localStorage.getItem("TeacherName");
    // console.log(names);
    // console.log(search.value);
    // search.value = "";
    let studentDetail = collection(db, "studentDetail");
    const q = query(studentDetail, where("rollNumber", "==", search.value));
    // console.log(auth.currentUser.uid);
    getDocs(q)
        .then((items) => {
            items.docs.forEach(doc => {
                console.log(doc.data());
                profile.src = doc.data().picture;
                name.innerHTML = doc.data().Name;
                rollNumber.innerHTML = doc.data().rollNumber;
                section.innerHTML = doc.data().section;
                
            });
        })
        .catch(()=>{
            alert("Please enter correct roll number")
        })

    }

})


mark.addEventListener("click" , async ()=>{
    let studentDetail = collection(db, "studentDetail");
    const q = query(studentDetail, where("rollNumber", "==", search.value));
    // console.log(auth.currentUser.uid);
    getDocs(q)
        .then((items) => {
            items.docs.forEach(async doc => {
                console.log(doc.data());
                let attendance = collection(db, "attendance");
                await addDoc(attendance, { Name: doc.data().Name , rollNumber: doc.data().rollNumber , section: doc.data().section , attendance: select.value});
            
                swal("Good job!", "student attendace complete !", "success");
                
            });
        })
    console.log(select.value);

        
        

})