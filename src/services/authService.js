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
  const usersData = localStorage.getItem('users');
  let users;
  try {
    users = usersData ? JSON.parse(usersData) : [];

    if (!Array.isArray(users)) {
      users = [];
    }
  } catch (e) {
    users = [];
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { error: 'Invalid credentials' };

  const authData = {
    user,
    isLoggedIn: true,
  };
  localStorage.setItem('auth', JSON.stringify(authData));
  return { success: true, user };
};

export const logoutUser = () => {
  localStorage.removeItem('auth');
  return { success: true };
};

// Helper to check login status
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('auth') || '{}');
};

export const generateResetToken = (email) => {
    const token = Math.random().toString(36).substring(2);
    const tokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    tokens[token] = email;
    localStorage.setItem('resetTokens', JSON.stringify(tokens));
    return token;
};
  
export const forgotPassword = (email) => {
  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    users = usersData ? JSON.parse(usersData) : [];
    if (!Array.isArray(users)) {
      users = [];
    }
  } catch (error) {
    users = [];
  }
  
  const token = generateResetToken(email);
  return {
    success: true,
    message: 'Password reset link has been generated.',
    resetLink: `/reset-password/${token}`,
  };
};

export const resetPassword = (token, newPassword) => {
  let tokens = {};
  try {
    const tokensData = localStorage.getItem('resetTokens');
    tokens = tokensData ? JSON.parse(tokensData) : {};
  } catch (error) {
    tokens = {};
  }

  const email = tokens[token];
  if (!email) return { error: 'Invalid or expired token' };

  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    users = usersData ? JSON.parse(usersData) : [];
    if (!Array.isArray(users)) {
      users = [];
    }
  } catch (error) {
    users = [];
  }

  const updatedUsers = users.map(user => {
    if (user?.email === email) {
      return { ...user, password: newPassword };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  delete tokens[token];
  localStorage.setItem('resetTokens', JSON.stringify(tokens));

  return { success: true };
};

export const changePassword = (email, newPassword) => {
  let users;
  try {
    users = JSON.parse(localStorage.getItem('users')) || [];
    if (!Array.isArray(users)) users = [];
  } catch (e) {
    users = [];
  }
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    return { error: "User not found" };
  }
  users[userIndex].password = newPassword;
  localStorage.setItem('users', JSON.stringify(users));

  // Update session info
  let auth = {};
  try {
    auth = JSON.parse(localStorage.getItem('auth')) || {};
  } catch (e) {
    auth = {};
  }
  if (auth.user && auth.user.email === email) {
    auth.user.password = newPassword;
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  return { success: true };
};