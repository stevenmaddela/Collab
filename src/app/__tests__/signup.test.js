import OnboardingPage from "@component/pages/signup";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('<OnboardingPage />', () => {
    it("should render and display expected content", () => {
        render(<OnboardingPage />)
    });
})