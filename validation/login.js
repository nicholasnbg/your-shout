const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  //Set any empty fields to empty strings for the following fields
  const checkForEmptyStrings = ['email', 'password'];
  checkForEmptyStrings.forEach(prop => {
    data[prop] = !isEmpty(data[prop]) ? data[prop] : '';
  })

  if (!Validator.isEmail(data.email)) {
    errors.email = "A valid email is required"
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}