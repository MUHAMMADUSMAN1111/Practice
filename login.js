// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// Initialize Firebase
const app = initializeApp(firebaseConfig);

var welcomeBox = document.getElementById('welcome_box');
welcomeBox.style.display = 'none'

var Login = document.getElementById('Login')
Login.addEventListener('click', login)
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!(email && password)) {
        alert('FILL BOTH FEILD')
    }
    else if (!(email.includes('@'))) {
        alert('ENTER EMAIL')
    }
    else {
        console.log(email, password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                welcomeBox.style.display = 'block';
                welcomeBox.innerHTML = `WELCOME ${email}`
                location.href = 'Todo.html'
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log(user);
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorMessage);
        //         alert("WRONG INPUT")
        //         // ..
        //     });
    }
}

var Logout = document.getElementById('Logout');
Logout.addEventListener('click', logout)
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

var SignUp = document.getElementById('SignUp')
SignUp.addEventListener('click', signup);
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!(email && password)) {
        alert('FILL BOTH FEILD')
    }
    else if (!(email.includes('@'))) {
        alert('ENTER EMAIL')
    }
    else if (!(password.length > 6)) {
        alert('ENTER STRONG PASSWARD')
    }
    else {
        console.log(email, password);
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         var user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ..
        //     });
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                location.href = 'Todo.html'
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
}
