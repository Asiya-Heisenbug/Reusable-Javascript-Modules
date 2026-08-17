// ui.js
// Reusable UI update functions.

export function showMessage(message, type = "info") {
    let messageBox = document.getElementById("message");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "message";
        document.body.prepend(messageBox);
    }

    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
}

export function updateUserUI(user) {
    const userName = document.getElementById("userName");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    if (user) {
        if (userName) {
            userName.textContent = `Welcome, ${user.name}`;
        }

        if (loginButton) {
            loginButton.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "block";
        }
    } else {
        if (userName) {
            userName.textContent = "";
        }

        if (loginButton) {
            loginButton.style.display = "block";
        }

        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
}

export function displayCourses(courses, containerId = "courses") {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    courses.forEach(course => {
        const courseElement = document.createElement("div");

        courseElement.className = "course-card";

        courseElement.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.body}</p>
            <button data-course-id="${course.id}">
                Select Course
            </button>
        `;

        container.appendChild(courseElement);
    });
}

export function displayErrors(errors) {
    showMessage(errors.join(" "), "error");
}
