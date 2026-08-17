// validation.js
// Reusable form validation functions.

export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}

export function validateName(name) {
    return name.trim().length >= 2;
}

export function validateRequired(value) {
    return value.trim().length > 0;
}

export function validateRegistration(name, email, password) {
    const errors = [];

    if (!validateName(name)) {
        errors.push("Name must contain at least 2 characters.");
    }

    if (!validateEmail(email)) {
        errors.push("Enter a valid email address.");
    }

    if (!validatePassword(password)) {
        errors.push("Password must contain at least 6 characters.");
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export function validateLogin(email, password) {
    const errors = [];

    if (!validateEmail(email)) {
        errors.push("Enter a valid email address.");
    }

    if (!validateRequired(password)) {
        errors.push("Password is required.");
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
