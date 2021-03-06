let passwordValidator = require('password-validator');

// Create a schema
let schema = new passwordValidator();

// Add properties to it
schema
    .is().min(6)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().symbols(1)                               // Must have min one symbol
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', '123']); // Blacklist these values

module.exports = schema;