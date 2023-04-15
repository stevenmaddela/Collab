import OnboardingPage from "@component/pages/login";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('<OnboardingPage />', () => {
    it("should render and display expected content", () => {
        render(<OnboardingPage />)
    });
})