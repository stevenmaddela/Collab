import { validateTitle } from '@component/pages/schedule';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

describe("/schedule", () => {
    test("Meeting Box is not empty", () => {
        expect(validateTitle("Meeting")).toBe(true);
        expect(validateTitle("")).toBe(false);
        expect(validateTitle(" ")).toBe(false);
        expect(validateTitle("                   ")).toBe(false);
    });
});