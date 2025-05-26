// export const registerUser = ({ name, email, password }) => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const exists = users.find((user) => user.email === email);
//     if (exists) return { error: 'Email already registered' };

//     const newUser = { name, email, password };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     return { success: true };
// };
  
// export const loginUser = ({ email, password }) => {
//     console.log('loginUser called with:', { email, password });
    
//     // Get the stored users data
//     const usersData = localStorage.getItem('users');
//     // Parse it, defaulting to an empty array if null/undefined
//     const users = usersData ? JSON.parse(usersData) : [];
//     console.log('users', users);
//     // If it's a single user object, convert it to an array
//     const usersArray = Array.isArray(users) ? users : [users];
//     console.log('usersArray', usersArray);
//     const user = usersArray.find((u) => u.email === email && u.password === password); 
//     console.log('user found:', user);
    
//     if (!user) return { error: 'Invalid credentials' };

//     const authData = {
//         user,
//         isLoggedIn: true,
//     };
//     localStorage.setItem('users', JSON.stringify(authData));
//     return { success: true, user };
// };

// export const logoutUser = () => {
//   const authData = JSON.parse(localStorage.getItem('users'));
  
//   if (authData) {
//     // Update isLoggedIn to false
//     const updatedAuth = { ...authData, isLoggedIn: false };
//     localStorage.setItem('users', JSON.stringify(updatedAuth));
//   }
  
//   // Alternatively, remove auth entirely on logout:
//   // localStorage.removeItem('auth');
  
//   return { success: true };
// };

// export const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem('users'));
// };
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
  const users = usersData ? JSON.parse(usersData) : [];
  const usersArray = Array.isArray(users) ? users : [users];
  const user = usersArray.find((u) => u.email === email && u.password === password); 

  if (!user) return { error: 'Invalid credentials' };

  // Save session info separately
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
  // Safely get and parse users data with proper fallback
  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const usersArray = Array.isArray(users) ? users : [users];
    
    // Ensure users is an array
    if (usersArray) {
      console.error('Users data is not an array, resetting to empty array');
      users = [];
    }
  } catch (error) {
    console.error('Error parsing users data:', error);
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
  console.log('token:', token, 'password',newPassword);
  
  // Get reset tokens with proper fallback
  let tokens = {};
  try {
    const tokensData = localStorage.getItem('resetTokens');
    tokens = tokensData ? JSON.parse(tokensData) : {};
  } catch (error) {
    console.error('Error parsing reset tokens:', error);
    tokens = {};
  }

  const email = tokens[token];
  if (!email) return { error: 'Invalid or expired token' };

  // Get users data with proper error handling
  let users = [];
  try {
    const usersData = localStorage.getItem('users');
    users = usersData ? JSON.parse(usersData) : [];
    
    // Ensure users is always an array
    if (!Array.isArray(users)) {
      console.error('Users data is not an array, resetting to empty array');
      users = [];
    }
  } catch (error) {
    console.error('Error parsing users data:', error);
    users = [];
  }

  // Update user password
  const updatedUsers = users.map(user => {
    // Using optional chaining in case user structure is unexpected
    if (user?.email === email) {
      return { ...user, password: newPassword };
    }
    return user;
  });

  // Save updated users
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  // Remove used token
  delete tokens[token];
  localStorage.setItem('resetTokens', JSON.stringify(tokens));

  return { success: true };
};