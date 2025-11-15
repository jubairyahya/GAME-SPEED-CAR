
// Get references to elements
const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const logoutButton = document.getElementById("logoutButton");
const usernameDisplay = document.getElementById("usernameDisplay");

// Function to check login status
function checkLoginStatus() {
    // Get the logged-in username from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // User is logged in
        usernameDisplay.textContent = `Welcome, ${loggedInUser}`;
        logoutButton.style.display = "inline-block"; // Show logout button
        loginLink.style.display = "none"; // Hide login link
        registerLink.style.display = "none"; // Hide registration link
    } else {
        // User is not logged in
        usernameDisplay.textContent = ""; // Clear any displayed username
        logoutButton.style.display = "none"; // Hide logout button
        loginLink.style.display = "inline"; // Show login link
        registerLink.style.display = "inline"; // Show registration link
    }
}

// Logout function
function logout() {
    // Remove login information from localStorage
    localStorage.removeItem("loggedInUser");

    // Optionally, redirect to the homepage after logout
    window.location.href = "../index.html";
}

// Event listener for the logout button
logoutButton.addEventListener("click", logout);

// Check login status on page load
window.onload = checkLoginStatus;