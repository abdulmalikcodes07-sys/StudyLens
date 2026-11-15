// Import Firebase authentication functions

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";


// Get HTML elements

const registerForm = document.getElementById("registerForm");

const loginForm = document.getElementById("loginForm");

const showLogin = document.getElementById("showLogin");

const switchText = document.getElementById("switchText");

const formTitle = document.getElementById("formTitle");

const formDescription = document.getElementById("formDescription");

const authMessage = document.getElementById("authMessage");


// =================================
// SWITCH BETWEEN FORMS
// =================================

showLogin.addEventListener("click", function () {

    registerForm.classList.toggle("hidden");

    loginForm.classList.toggle("hidden");


    if (loginForm.classList.contains("hidden")) {

        formTitle.textContent = "Create your account";

        formDescription.textContent =
            "Start your smarter learning journey today.";

        switchText.innerHTML =
            'Already have an account? <button type="button" id="showLogin">Login</button>';

    } else {

        formTitle.textContent = "Welcome back!";

        formDescription.textContent =
            "Login to continue your learning journey.";

        switchText.innerHTML =
            'Don\'t have an account? <button type="button" id="showLogin">Create Account</button>';

    }

    // Reconnect the newly created button

    document.getElementById("showLogin").addEventListener("click", switchForms);

    authMessage.textContent = "";

});


function switchForms() {

    registerForm.classList.toggle("hidden");

    loginForm.classList.toggle("hidden");

    if (loginForm.classList.contains("hidden")) {

        formTitle.textContent = "Create your account";

        formDescription.textContent =
            "Start your smarter learning journey today.";

        switchText.innerHTML =
            'Already have an account? <button type="button" id="showLogin">Login</button>';

    } else {

        formTitle.textContent = "Welcome back!";

        formDescription.textContent =
            "Login to continue your learning journey.";

        switchText.innerHTML =
            'Don\'t have an account? <button type="button" id="showLogin">Create Account</button>';

    }

    document.getElementById("showLogin").addEventListener("click", switchForms);

    authMessage.textContent = "";

}


// =================================
// STUDENT REGISTRATION
// =================================

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("registerEmail").value.trim();

    const password = document.getElementById("registerPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        authMessage.textContent = "Passwords do not match.";

        return;

    }


    try {

        authMessage.textContent = "Creating your account...";

       const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
);

const user = userCredential.user;

// Save the user's name to Firebase Authentication
await updateProfile(user, {
    displayName: fullName
});

// Save the user's information to Firestore
await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName: fullName,
    email: email,
    createdAt: serverTimestamp()
});

authMessage.textContent = "Account created successfully!";

window.location.href = "dashboard.html";


    } catch (error) {

        authMessage.textContent = error.message;

    }

});


// =================================
// STUDENT LOGIN
// =================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;


    try {

        authMessage.textContent = "Logging you in...";

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "dashboard.html";


    } catch (error) {

        authMessage.textContent = "Login failed: " + error.message;

    }

});