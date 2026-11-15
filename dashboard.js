import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";


import { signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

// Initialize icons

lucide.createIcons();


// =================================
// SIDEBAR TOGGLE
// =================================

const sidebarToggle = document.getElementById("sidebarToggle");

const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});


// =================================
// PDF UPLOAD
// =================================

const chooseFile = document.getElementById("chooseFile");

const fileInput = document.getElementById("fileInput");
const extractedMaterials = [];
const materialsList = document.getElementById("materialsList");


const uploadSection = document.querySelector(".upload-section");


// Open file selector

chooseFile.addEventListener("click", function () {

    fileInput.click();

});


// Handle selected files

fileInput.addEventListener("change", function () {

    handleFiles(fileInput.files);

    fileInput.value = "";

});

async function extractPdfText(file) {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
            .map(item => item.str)
            .join(" ");

        fullText += `\nPage ${pageNumber}:\n${pageText}\n`;
    }

    return {
        text: fullText,
        pageCount: pdf.numPages
    };
}


// Display uploaded files

function handleFiles(files) {

    Array.from(files).forEach(async function (file) {

        if (file.type !== "application/pdf") {

            alert("Please upload PDF files only.");

            return;

        }

        const emptyMessage = document.getElementById("emptyMaterials");

        if (emptyMessage) {

            emptyMessage.remove();

        }

        const materialCard = document.createElement("div");

        materialCard.className = "material-card";

        const icon = document.createElement("div");

        icon.className = "material-icon";

        icon.innerHTML = '<i data-lucide="file-text"></i>';

        const info = document.createElement("div");

        info.className = "material-info";

        const title = document.createElement("h3");

        title.textContent = file.name;

        const description = document.createElement("p");

        description.textContent = "Selected successfully";

        let savedMaterial = null;

try {
    description.textContent = "Reading PDF...";

    const result = await extractPdfText(file);

    savedMaterial = {
        name: file.name,
        text: result.text,
        pageCount: result.pageCount
    };

    extractedMaterials.push(savedMaterial);

    description.textContent =
        `Successfully read ${result.pageCount} pages`;

    console.log("Extracted PDF text:", result.text);

} catch (error) {
    console.error("PDF extraction failed:", error);

    description.textContent = "Could not read this PDF";
}

        info.appendChild(title);

        info.appendChild(description);


        const deleteButton = document.createElement("button");

        deleteButton.className = "material-delete";

        deleteButton.setAttribute("aria-label", "Remove material");

        deleteButton.innerHTML = '<i data-lucide="trash-2"></i>';

        deleteButton.addEventListener("click", function () {

            materialCard.remove();

            if (materialsList.children.length === 0) {

                showEmptyMessage();

            }

        });


        materialCard.appendChild(icon);

        materialCard.appendChild(info);

        materialCard.appendChild(deleteButton);

        materialsList.appendChild(materialCard);

        lucide.createIcons();

    });

}


// Show empty message when all files are removed

function showEmptyMessage() {

    materialsList.innerHTML = `

        <div class="empty-materials" id="emptyMaterials">

            <i data-lucide="file-text"></i>

            <h3>No materials uploaded yet</h3>

            <p>Your uploaded PDFs will appear here.</p>

        </div>

    `;

    lucide.createIcons();

}


// =================================
// DRAG AND DROP
// =================================

uploadSection.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadSection.classList.add("drag-over");

});


uploadSection.addEventListener("dragleave", function () {

    uploadSection.classList.remove("drag-over");

});


uploadSection.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadSection.classList.remove("drag-over");

    handleFiles(event.dataTransfer.files);

});


// =================================
// CHAT INTERFACE
// =================================

const chatForm = document.getElementById("chatForm");

const chatInput = document.getElementById("chatInput");

const chatMessages = document.getElementById("chatMessages");


chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const question = chatInput.value.trim();

    if (question === "") {

        return;

    }


    // Display user's question

    const userMessage = document.createElement("div");

    userMessage.className = "chat-message user-message";

    userMessage.textContent = question;

    chatMessages.appendChild(userMessage);


    // Clear input

    chatInput.value = "";


    // Temporary AI response

    const aiMessage = document.createElement("div");

    aiMessage.className = "chat-message ai-message";

    aiMessage.textContent = "Your question has been received! Connect your study materials and the AI assistant will be available once we integrate our AI service.";

    chatMessages.appendChild(aiMessage);


    // Scroll to latest message

    chatMessages.scrollTop = chatMessages.scrollHeight;

});


// =================================
// QUICK ACTIONS
// =================================

const generateQuiz = document.getElementById("generateQuiz");

const trackProgress = document.getElementById("trackProgress");


generateQuiz.addEventListener("click", function () {

    alert("Quiz generation will be available once we implement the quiz feature.");

});


trackProgress.addEventListener("click", function () {

    alert("Your study progress tracker is coming soon!");

});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
        await signOut(auth);

        window.location.replace("index.html");

    } catch (error) {
        console.error("Logout failed:", error);
    }
});

const userName = document.getElementById("userName");

onAuthStateChanged(auth, function (user) {

    if (user) {
        userName.textContent = user.displayName || "Student";
    }

});