const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Set any empty fields to empty strings for the following fields
  const checkForEmptyStrings = ['name', 'email', 'password', 'password2'];

  checkForEmptyStrings.forEach(prop => {
    data[prop] = !isEmpty(data[prop]) ? data[prop] : '';
  })

  if (!Validator.isLength(data.name, {
      min: 2,
      max: 30
    })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Valid email is required'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }
  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = 'Please choose a password between 6 and 30 characters long'
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required'
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}