import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
let uid;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});
console.log(uid)
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    addBtn.addEventListener("click", async function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const taskLabel = document.createElement("span");
            taskLabel.textContent = taskText;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                taskItem.remove();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskLabel);
            taskItem.appendChild(deleteBtn);

            taskList.appendChild(taskItem);
            console.log(uid)
            try {
                const docRef = await addDoc(collection(db, "Propertodos"), {
                    taskText,
                    uid
                });
                console.log("Document written with ID: ", docRef.id);
            } 
            catch (e) {
                console.error("Error adding document: ", e);
            }

            const querySnapshot = await getDocs(collection(db, "Propertodos"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().taskText}`);
            });

            taskInput.value = "";
        }
    });
});