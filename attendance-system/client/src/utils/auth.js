// Save user info to localStorage after login
export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Get current logged-in user info (or null if not logged in)
export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Get user role if logged in, else null
export function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

// Clear user info on logout
export function clearUser() {
  localStorage.removeItem('user');
}
