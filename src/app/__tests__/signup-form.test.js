import SignupForm from "@component/components/signup-form";
import { validateName, validateEmail, validatePassword } from "@component/components/signup-form";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

const VALID = "";
const INVALID_NAME = "Invalid Characters\n";
const INVALID_EMAIL = "Invalid Email\n";
const INVALID_PASSWORD = "Ensure your password has 1 uppercase, lowercase, and number\n";
const INVALID_PASSWORD_LENGTH = "Password must be at least 6 characters long";
const EMPTY_NAME = "Enter a name\n";
const EMPTY_EMAIL = "Enter an email address\n";
const EMPTY_PASSWORD = "Enter a password\n";

describe("<SignupForm />", () => {
    test("Name box prevents numberical and special characters", () => {
        expect(validateName("John Doe")).toBe(VALID);
        expect(validateName("1234567")).toBe(INVALID_NAME);
        expect(validateName("")).toBe(EMPTY_NAME);
    });

    test("Email box has valid email format", () => {
        expect(validateEmail("johndoe@gmail.com")).toBe(VALID);
        expect(validateEmail("johndoe.com")).toBe(INVALID_EMAIL);
        expect(validateEmail("")).toBe(EMPTY_EMAIL);
    })

    test("Password requires 1 uppercase, 1 lowercase, and 1 alphabetical character, and length is at least 6 characters", () => {
        expect(validatePassword("John123")).toBe(VALID);
        expect(validatePassword("aaaaaaaa")).toBe(INVALID_PASSWORD);
        expect(validatePassword("1234567")).toBe(INVALID_PASSWORD);
        expect(validatePassword("john123")).toBe(INVALID_PASSWORD);
        expect(validatePassword("JOHN123")).toBe(INVALID_PASSWORD);
        expect(validatePassword("aB123")).toBe(INVALID_PASSWORD_LENGTH);
        expect(validatePassword("")).toBe(EMPTY_PASSWORD);
    })
});