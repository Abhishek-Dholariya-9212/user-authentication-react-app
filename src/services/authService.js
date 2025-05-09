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

export const forgotPassword = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email);
    if (!user) return { error: 'Email not found' };

    // Simulate sending reset link
    return { success: true, message: 'Password reset link sent to your email' };
};

export const logoutUser = () => {
    localStorage.removeItem('authUser');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
};
  