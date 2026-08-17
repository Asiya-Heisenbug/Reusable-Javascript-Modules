// app.js
// Main application file.
// Connects authentication, API, validation and UI modules.

import {
    registerUser,
    loginUser,
    logoutUser,
    getLoggedInUser,
    selectCourse
} from "./auth.js";

import {
    getCourses
} from "./api.js";

import {
    validateRegistration,
    validateLogin
} from "./validation.js";

import {
    showMessage,
    updateUserUI,
    displayCourses,
    displayErrors
} from "./ui.js";


// ==========================
// APPLICATION INITIALIZATION
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const currentUser = getLoggedInUser();

    updateUserUI(currentUser);

    setupLogin();

    setupRegistration();

    setupLogout();

    loadCourses();
});


// ==========================
// LOGIN
// ==========================

function setupLogin() {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const validation = validateLogin(email, password);

        if (!validation.valid) {
            displayErrors(validation.errors);
            return;
        }

        const result = loginUser(email, password);

        if (!result.success) {
            showMessage(result.message, "error");
            return;
        }

        updateUserUI(result.user);

        showMessage("Login successful!", "success");

        loginForm.reset();
    });
}


// ==========================
// REGISTRATION
// ==========================

function setupRegistration() {
    const registrationForm =
        document.getElementById("registrationForm");

    if (!registrationForm) return;

    registrationForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password =
            document.getElementById("registerPassword").value;

        const validation =
            validateRegistration(name, email, password);

        if (!validation.valid) {
            displayErrors(validation.errors);
            return;
        }

        const result =
            registerUser(name, email, password);

        if (!result.success) {
            showMessage(result.message, "error");
            return;
        }

        showMessage(
            "Registration successful! You can now login.",
            "success"
        );

        registrationForm.reset();
    });
}


// ==========================
// LOGOUT
// ==========================

function setupLogout() {
    const logoutButton =
        document.getElementById("logoutButton");

    if (!logoutButton) return;

    logoutButton.addEventListener("click", () => {

        logoutUser();

        updateUserUI(null);

        showMessage("Logged out successfully.", "success");
    });
}


// ==========================
// LOAD COURSES
// ==========================

async function loadCourses() {
    try {
        const courses = await getCourses();

        displayCourses(courses);

        setupCourseSelection();

    } catch (error) {
        showMessage(
            "Unable to load courses.",
            "error"
        );
    }
}


// ==========================
// COURSE SELECTION
// ==========================

function setupCourseSelection() {
    const buttons =
        document.querySelectorAll("[data-course-id]");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const courseId = button.dataset.courseId;

            const course = {
                id: courseId
            };

            selectCourse(course);

            showMessage(
                `Course ${courseId} selected.`,
                "success"
            );
        });
    });
}
