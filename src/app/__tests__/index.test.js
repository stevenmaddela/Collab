import Home from "@component/pages";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('/', () => {
    it("should render and display expected content", () => {
        render(<Home />)
    });
})