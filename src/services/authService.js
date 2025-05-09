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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid credentials' };

    localStorage.setItem('authUser', JSON.stringify(user));
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
    localStorage.removeItem('authUser');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
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
  