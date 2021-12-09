const Validator = require("validator");
const isEmpty = require("is-empty");

// Sign-up Validator
exports.register=(data)=>{
    let errors ={};
    // so we can use validator functions
    data.name=!isEmpty(data.name)?data.name:"";
    data.email=!isEmpty(data.email)?data.email:"";
    data.password=!isEmpty(data.password)?data.password:"";
    data.password2=!isEmpty(data.password2)?data.password2:"";
    // Name checks
    if (Validator.isEmpty(data.name)){
        errors.name="Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)){
        errors.email="Email field is required";
    } else if (!Validator.isEmail(data.email)){
        errors.email="Email invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)){
        errors.password="Password field is required";
    }
    if (Validator.isEmpty(data.password2)){
        errors.password2="Confirm Password field is required";
    }
    if (!Validator.isLength(data.password,{min:6,max:30})){
        errors.password="Password must be atleast 6 characters";
    }
    if (!Validator.equals(data.password,data.password2)){
        errors.password="Password must match";
    }
    return{
        errors,
        isValid:isEmpty(errors)
    };
};

// Login Input Validator
exports.login=(data)=>{
    let errors = {};
    // Convert empty fields to an empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// Email validation
exports.isEmail=(data)=>{
    let errors = {};
    // Convert empty fields to an empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
exports.isPassword=(data)=>{
    let errors = {};
    // Convert empty fields to an empty string
    data.password=!isEmpty(data.password)?data.password:"";
    data.password2=!isEmpty(data.password2)?data.password2:"";

    // Password checks
    if (Validator.isEmpty(data.password)){
        errors.password="Password field is required";
    }
    if (Validator.isEmpty(data.password2)){
        errors.password2="Confirm Password field is required";
    }
    if (!Validator.isLength(data.password,{min:6,max:30})){
        errors.password="Password must be atleast 6 characters";
    }
    if (!Validator.equals(data.password,data.password2)){
        errors.password="Password must match";
    }
    return{
        errors,
        isValid:isEmpty(errors)
    };
};