/**
 * Creates a login tracker that limits login attempts
 * @param {Object} userInfo - Object containing username and password
 * @param {string} userInfo.username - The user's username
 * @param {string} userInfo.password - The user's password
 * @returns {Function} A function that handles login attempts
 */
function createLoginTracker(userInfo) {
    // Initialize attempt counter (private variable via closure)
    let attemptCount = 0;
    
    // Return an inner arrow function to handle login attempts
    return (passwordAttempt) => {
        // Increment the attempt count
        attemptCount++;
        
        // Check if account is locked (more than 3 attempts)
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }
        
        // Check if password matches
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // Password doesn't match - return failure message with attempt number
            return `Login attempt ${attemptCount} failed. Login failed`;
        }
    };
}

// Export the function for testing (REQUIRED)
module.exports = createLoginTracker;

// ===== MANUAL TESTING (Optional - you can keep or remove this) =====
// Uncomment below to test manually with: node index.js

/*
console.log("=== Testing Login Tracker ===\n");

// Test 1: Two failed attempts, then success
console.log("Test 1: Two failed attempts, then success");
const user1 = createLoginTracker({
    username: "user1",
    password: "password123"
});
console.log(user1("wrong1")); // Should be "Login attempt 1 failed. Login failed"
console.log(user1("wrong2")); // Should be "Login attempt 2 failed. Login failed"
console.log(user1("password123")); // Should be "Login successful"
console.log("");

// Test 2: Account lockout after 3 failed attempts
console.log("Test 2: Account lockout after 3 failed attempts");
const user2 = createLoginTracker({
    username: "user2",
    password: "secret456"
});
console.log(user2("wrong1")); // Attempt 1 failed
console.log(user2("wrong2")); // Attempt 2 failed
console.log(user2("wrong3")); // Attempt 3 failed
console.log(user2("wrong4")); // Should be "Account locked..."
console.log(user2("secret456")); // Should still be "Account locked..." even with correct password
console.log("");

console.log("=== All Tests Complete ===");
*/