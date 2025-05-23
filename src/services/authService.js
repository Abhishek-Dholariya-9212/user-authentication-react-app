export const registerUser = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((user) => user.email === email);
    if (exists) return { error: 'Email already registered' };

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
};
  
export const loginUser = ({ email, password }) => {
    // Get the stored users data
    const usersData = localStorage.getItem('users');
    // Parse it, defaulting to an empty array if null/undefined
    const users = usersData ? JSON.parse(usersData) : [];
    console.log('users', users);
    
    // If it's a single user object, convert it to an array
    const usersArray = Array.isArray(users) ? users : [users];
    const user = usersArray.find((u) => u.email === email && u.password === password); 
    if (!user) return { error: 'Invalid credentials' };

    const authData = {
        user,
        isLoggedIn: true,
    };
    localStorage.setItem('users', JSON.stringify(authData));
    return { success: true, user };
};

// export const forgotPassword = (email) => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find((u) => u.email === email);
//     if (!user) return { error: 'Email not found' };

//     // Simulate sending reset link
//     return { success: true, message: 'Password reset link sent to your email' };
// };

export const logoutUser = () => {
  const authData = JSON.parse(localStorage.getItem('users'));
  
  if (authData) {
    // Update isLoggedIn to false
    const updatedAuth = { ...authData, isLoggedIn: false };
    localStorage.setItem('users', JSON.stringify(updatedAuth));
  }
  
  // Alternatively, remove auth entirely on logout:
  // localStorage.removeItem('auth');
  
  return { success: true };
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('users'));
};

export const generateResetToken = (email) => {
    const token = Math.random().toString(36).substring(2);
    const tokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    tokens[token] = email;
    localStorage.setItem('resetTokens', JSON.stringify(tokens));
    return token;
};
  
export const forgotPassword = (email) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u) => u.email === email);
  if (!user) return { error: 'Email not found' };

  const token = generateResetToken(email);
  return {
    success: true,
    message: 'Password reset link has been generated.',
    resetLink: `/reset-password/${token}`,
  };
};
  
export const resetPassword = (token, newPassword) => {
  const tokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
  const email = tokens[token];
  if (!email) return { error: 'Invalid or expired token' };

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.map((user) =>
    user.email === email ? { ...user, password: newPassword } : user
  );
  localStorage.setItem('users', JSON.stringify(users));

  delete tokens[token];
  localStorage.setItem('resetTokens', JSON.stringify(tokens));

  return { success: true };
};