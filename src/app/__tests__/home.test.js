import Home from "@component/pages/home";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('/home', () => {
    it("should render and display expected content", () => {
        render(<Home />)
    });
})