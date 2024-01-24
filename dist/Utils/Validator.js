"use strict";
//validator con Regex
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateNickname = exports.validateEmail = exports.validatePhone = exports.validateDate = exports.validateLastName = exports.validateName = void 0;
const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]{2,100}$/;
    return nameRegex.test(name);
};
exports.validateName = validateName;
const validateLastName = (lastName) => {
    const lastNameRegex = /^[a-zA-Z ]{3,100}$/;
    return lastNameRegex.test(lastName);
};
exports.validateLastName = validateLastName;
const validateDate = (date) => {
    const dateRegex = /^[a-zA-Z0-9 ]{3,20}$/;
    return dateRegex.test(date);
};
exports.validateDate = validateDate;
const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{6,15}$/;
    return phoneRegex.test(phone);
};
exports.validatePhone = validatePhone;
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validateNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return nicknameRegex.test(nickname);
};
exports.validateNickname = validateNickname;
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{6,15}$/;
    return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=Validator.js.map