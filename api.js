// api.js
// Centralized API functions.

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

export async function getCourses() {
    return await apiRequest("/posts?_limit=10");
}

export async function getCourseById(courseId) {
    return await apiRequest(`/posts/${courseId}`);
}

export async function createCourse(courseData) {
    return await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify(courseData)
    });
}
