const Validator = require("validator");
const isEmpty = require("is-empty");

// Book add Validator
exports.addBook = (data) =>{
    let errors = {};
    // Convert empty fields to an empty string
    data.bname = !isEmpty(data.bname) ? data.bname : "";
    data.isbn = !isEmpty(data.isbn) ? data.isbn : "";
    data.quantity = !isNaN(data.quantity) ? data.quantity : -1;
    // Book name check
    if (Validator.isEmpty(data.bname)) {
        errors.banme = "Book name is required";
    }
    // ISBN check
    if (Validator.isEmpty(data.isbn)) {
        errors.isbn = "ISBN is required";
    } else if (!Validator.isLength(data.isbn, { min: 10, max: 13 })) {
        errors.isbn = "Please enter valid ISBN";
    }
    // Quantity check
    if (data.quantity<0) {
        errors.quantity = "Please enter valid quantity";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// Remove Book Validator
exports.removeBook = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.isbn = !isEmpty(data.isbn) ? data.isbn : "";
    data.quantity = !isNaN(data.quantity) ? data.quantity : -1;
    // ISBN checks
    if (Validator.isEmpty(data.isbn)) {
        errors.isbn = "ISBN is required";
    } else if (!Validator.isLength(data.isbn, {min: 10, max: 13})) {
        errors.isbn = "Please enter valid ISBN";
    }
    // Quantity checks
    if (data.quantity < 0) {
        errors.quantity = "Please enter valid quantity";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

// Find book Validator
exports.findBook = (data) => {
    let errors = {};
    // Convert empty fields to an empty string
    data.isbn = !isEmpty(data.isbn) ? data.isbn : "";
    // ISBN checks
    if (Validator.isEmpty(data.isbn)) {
        errors.isbn = "ISBN is required";
    } else if (!Validator.isLength(data.isbn, { min: 10, max: 13 })) {
        errors.isbn = "Please enter valid ISBN";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};