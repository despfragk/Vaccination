const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAppointmentInput(data) {
    let errors = {};

    // Convert empty fields toan  empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.amka = !isEmpty(data.amka) ? data.amka : "";
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
    //data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.dateDose1 = !isEmpty(data.dateDose1) ? data.dateDose1 : "";
    data.dateDose2 = !isEmpty(data.dateDose2) ? data.dateDose2 : "";
    data.vaccineBrand = !isEmpty(data.vaccineBrand) ? data.vaccineBrand : ""
    //data.stage = !isEmpty(data.stage) ? data.stage : "";

    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    // Surname checks
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }

    // Gender checks
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "Gender field is required";
    }

    // AMKA checks
    if(Validator.isEmpty(data.amka)) {
        errors.amka = "AMKA field is required";
    }
    if(isNaN(data.amka)) {
        errors.amka = "AMKA field must be a number";
    }

    // Birthday checks
    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = "Birthday field is required";
    }
    
    // Phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }
    if(isNaN(data.phone)) {
        errors.phone = "Phone field must be a number";
    }

    //Doses checks
    if (Validator.isEmpty(data.dateDose1)) {
        errors.dateDose1 = "Date of dose one field is required";
    }
    if (Validator.isEmpty(data.dateDose2)) {
        errors.dateDose2 = "Date of dose two field is required";
    }

    //Address checks
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }

    // // Vaccine Brand checks
    // if (Validator.isEmpty(data.vaccineBrand)) {
    //     errors.vaccineBrand = "Vaccine brand field is required";
    // }

    // // Stage checks
    // if (Validator.isEmpty(data.stage)) {
    //     errors.stage = "Stage of vaccination field is required";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
