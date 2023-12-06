export const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isPasswordValid = (password) => {
    // Add your password validation criteria here
    // For example, you can check if the password has a minimum length
    return password.length >= 6;
  };

