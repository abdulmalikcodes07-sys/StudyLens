import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import { auth } from "./firebase-config.js";

console.log("Dashboard authentication script loaded!");

onAuthStateChanged(auth, function (user) {

    console.log("Current user:", user);

    if (!user) {
        console.log("No user logged in. Redirecting...");
        window.location.replace("auth.html");
    } else {
        console.log("User is logged in:", user.email);
    }

});