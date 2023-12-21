export const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

export const validatePhone = (input) => {
    const phoneRegex = /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/;
    return phoneRegex.test(input);
  };