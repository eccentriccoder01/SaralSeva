//Validate string (letters, spaces, optional: numbers)
export const validString = (str, minLen, maxLen) => {
  if (typeof str !== "string") return null;

  str = str.trim();

  if (str.length < minLen || str.length > maxLen) return null;

  if (!/^[a-zA-Z\s]+$/.test(str)) return null;

  return str;
};

export const validEmail = (str) => {
  if (typeof str !== "string") return null;

  str = str.trim();

  if (str.length < 6 || str.length > 100) return null;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(str)) return null;

  return str.toLowerCase(); // normalize email
};

//Validate password (8–255 chars, 1 lowercase, 1 uppercase, 1 digit, 1 special char)
export const validPassword = (str) => {
  if (typeof str !== "string") return null;

  str = str.trim();

  if (str.length < 8 || str.length > 255) return null;
  if (/\s/.test(str)) return null;

  const hasLowerCase = /[a-z]/.test(str);
  const hasUpperCase = /[A-Z]/.test(str);
  const hasDigit = /\d/.test(str);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str);

  return hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar ? str : null;
};

//Validate gender
export const validGender = (gender) => {
  if (typeof gender !== "string") return null;

  gender = gender.trim().toLowerCase();

  const valid = ["male", "female"];

  return valid.includes(gender) ? gender : null;
};

//Validate mobile (Indian 10-digit format)
export const validMobile = (num) => {
  if (typeof num !== "string" && typeof num !== "number") return null;

  const str = num.toString().trim();

  return /^[6-9]\d{9}$/.test(str) ? str : null;
};

//Validate ID (UUID or alphanumeric)
export const validID = (id) => {
  if (typeof id !== "string") return null;

  id = id.trim();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const alphanumericRegex = /^[a-zA-Z0-9_-]+$/;

  return uuidRegex.test(id) || alphanumericRegex.test(id) ? id : null;
};
