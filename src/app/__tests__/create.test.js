import Create, { validateTitle } from "@component/pages/create";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

describe("/create", () => {

    test("Title Box is not empty", () => {
        expect(validateTitle("Collab")).toBe(true);
        expect(validateTitle("")).toBe(false);
        expect(validateTitle(" ")).toBe(false);
        expect(validateTitle("                   ")).toBe(false);
    });

    test("Title box does not contain special characters", () => {
        expect(validateTitle("Collab")).toBe(true);
        expect(validateTitle("Collab&")).toBe(false);
        expect(validateTitle("#Collab")).toBe(false);
        expect(validateTitle("#@#@#!@(*(")).toBe(false);
    });
});