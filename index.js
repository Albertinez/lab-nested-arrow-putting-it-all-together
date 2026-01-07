


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};


// Step 1: Outer function to create the login tracker
function createLoginTracker(userInfo) {
    // This variable keeps track of login attempts (closure)
    let attemptCount = 0;

    // Step 2: Inner arrow function that handles each login attempt
    const loginAttempt = (passwordAttempt) => {
        // If account is already locked
        if (attemptCount >= 3) {
            return "Account locked due to too many failed login attempts";
        }

        // Increment attempt count
        attemptCount++;

        // Check if password matches
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // If incorrect password and attempts remain
            if (attemptCount < 3) {
                return `Login attempt ${attemptCount}: Login failed`;
            } else {
                // If this is the 3rd failed attempt
                return "Account locked due to too many failed login attempts";
            }
        }
    };

    // Return the inner function so we can call it multiple times
    return loginAttempt;
}

// ===== Example usage =====
const user = {
    username: "user1",
    password: "password123"
};

// Initialize the login tracker
const login = createLoginTracker(user);

// Test different scenarios
console.log(login("wrongpass"));       // Login attempt 1: Login failed
console.log(login("anotherwrong"));    // Login attempt 2: Login failed
console.log(login("password123"));     // Login successful (if <=3 attempts)
console.log(login("wrongagain"));      // Account locked due to too many failed login attempts
