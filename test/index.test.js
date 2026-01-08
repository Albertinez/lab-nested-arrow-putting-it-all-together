const createLoginTracker = require('../index');

describe('createLoginTracker', () => {
  let user1Login;
  let mockUser;

  beforeEach(() => {
    mockUser = {
      "username": "testUser",
      "password": "securePassword"
    }
    user1Login = createLoginTracker(mockUser);
  });

  test('should return a function', () => {
    expect(typeof user1Login).toBe('function');
  });

  test('should return "Login successful" with correct password on first attempt', () => {
    const result = user1Login("securePassword");
    expect(result).toBe("Login successful");
  });

  test('should return failure message with incorrect password', () => {
    const result = user1Login("wrongPassword");
    expect(result).toContain("Login attempt 1 failed");
  });

  test('should increment attempt count with each call', () => {
    user1Login("wrongPassword");
    const result = user1Login("wrongPassword");
    expect(result).toContain("Login attempt 2 failed");
  });

  test('should lock account after 3 failed attempts', () => {
    user1Login("wrongPassword"); // Attempt 1
    user1Login("wrongPassword"); // Attempt 2
    user1Login("wrongPassword"); // Attempt 3
    const result = user1Login("wrongPassword"); // Attempt 4
    expect(result).toBe("Account locked due to too many failed login attempts");
  });

  test('should remain locked even with correct password after lockout', () => {
    user1Login("wrongPassword"); // Attempt 1
    user1Login("wrongPassword"); // Attempt 2
    user1Login("wrongPassword"); // Attempt 3
    user1Login("wrongPassword"); // Attempt 4 - locked
    const result = user1Login("securePassword"); // Attempt 5 - should still be locked
    expect(result).toBe("Account locked due to too many failed login attempts");
  });

  test('should allow login on 3rd attempt if password is correct', () => {
    user1Login("wrongPassword"); // Attempt 1
    user1Login("wrongPassword"); // Attempt 2
    const result = user1Login("securePassword"); // Attempt 3
    expect(result).toBe("Login successful");
  });

  test('should create independent login trackers for different users', () => {
    const user2Login = createLoginTracker({
      username: "user2",
      password: "password123"
    });

    // Fail user1 three times
    user1Login("wrong");
    user1Login("wrong");
    user1Login("wrong");
    user1Login("wrong"); // Locked

    // User2 should still be able to login
    const result = user2Login("password123");
    expect(result).toBe("Login successful");
  });
});