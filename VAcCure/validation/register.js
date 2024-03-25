const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields toan  empty string so we can use validator functions
  data.hospitalName = !isEmpty(data.hospitalName) ? data.hospitalName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.hospitalName)) {
    errors.hospitalName = "Name field is required";
  }

  // Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  // City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  // Country checks
  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  // Phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
