import { auth, db, storage } from "./config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, doc, getDocs, query, where, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";



onAuthStateChanged(auth, (user) => {
    if (user) {
    const uid = user.uid;
    // ...
    } else {
        window.location = "./index.html";
    }
    });



let name = document.getElementById("name");
let father = document.getElementById("father");
let rollNumber = document.getElementById("rollNumber");
let contact = document.getElementById("contactNumber");
let cnic = document.getElementById("cnic");
let profile = document.getElementById("picture");
let courseName = document.getElementById("courseName");
let section = document.getElementById("section");
let button = document.getElementById("button");
let signout = document.getElementById("signout");


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



async function getData(user) {
    let allClasses = collection(db, "classDetail");
    const docSnaps = await getDocs(allClasses)
        .then((items) => {
            items.docs.forEach(doc => {
                console.log(doc.data());
                section.innerHTML = section.innerHTML +

                    `
                <option value="${doc.data().TeacherName +"  "+ doc.data().timing +"  "+ doc.data().schedules +"  "+ doc.data().courseName}">${doc.data().TeacherName} ${doc.data().timing} ${doc.data().schedules} ${doc.data().courseName}</option>
                `
                
                
            });
        })


}

getData()


button.addEventListener("click", async () => {
    // console.log(name.value);
    // console.log(father.value);
    // console.log(rollNumber.value);
    // console.log(contact.value);
    // console.log(cnic.value);
    // console.log(picture.files);
    // console.log(courseName.value);
    // console.log(section.value);
    console.log(section.value);


    let file = profile.files[0];
    let imageRef = ref(storage, `images/${file.name}`);

    let uploaded = await uploadBytes(imageRef, file);
    let url = await getDownloadURL(imageRef);
    console.log(url, 'downloadable URL');

    console.log("upload called", profile.files[0]);




    let allClasses = collection(db, "classDetail");
    const docSnaps = await getDocs(allClasses)
        .then((items) => {
            items.docs.forEach(doc => {
                // console.log(doc.data());
            });
        })










    let studentDetail = collection(db, "studentDetail");
    await addDoc(studentDetail, { Name: name.value, FatherName: father.value, rollNumber: rollNumber.value, contact: contact.value, cnic: cnic.value, picture: url, courseName: courseName.value, section: section.value });
    name.value = "";
    father.value = "";
    rollNumber.value = "";
    contact.value = "";
    courseName.value = "";
    cnic.value = "";

    swal("Good job!", "New Class Added!", "success");
})



