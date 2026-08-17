// auth.js
// Handles login, registration, logout and application state.

const STORAGE_KEY = "courseAppState";

const defaultState = {
    loggedInUser: null,
    selectedCourse: null
};

function getState() {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
        return { ...defaultState };
    }

    return JSON.parse(savedState);
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return {
            success: false,
            message: "User already exists."
        };
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return {
        success: true,
        message: "Registration successful."
    };
}

export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    const state = getState();

    state.loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    saveState(state);

    return {
        success: true,
        user: state.loggedInUser
    };
}

export function logoutUser() {
    const state = getState();

    state.loggedInUser = null;
    state.selectedCourse = null;

    saveState(state);
}

export function getLoggedInUser() {
    return getState().loggedInUser;
}

export function isLoggedIn() {
    return getState().loggedInUser !== null;
}

export function selectCourse(course) {
    const state = getState();

    state.selectedCourse = course;

    saveState(state);
}

export function getSelectedCourse() {
    return getState().selectedCourse;
}

export function getApplicationState() {
    return getState();
}
