const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateGroupInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, {
      min: 2,
      max: 30
    })) {
    errors.name = "Please give the group a name between 2 and 30 characters"
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Group name is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}