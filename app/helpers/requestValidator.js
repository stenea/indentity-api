/**
 * Created by vladtomsa on 27/09/2018
 */
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true}); // pass in options to the Ajv instance

// Define a shortcut function
const validate = validator.validate;

module.exports = validate;