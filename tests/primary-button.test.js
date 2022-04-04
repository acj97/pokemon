/** @jest-environment jsdom */
import { render, screen } from "./test-utils";
import PrimaryButton from "@pages/components/primary-button";

describe("Primary Button", () => {
  it("should render the children", () => {
    render(<PrimaryButton>
        <p>test text</p>
      </PrimaryButton>);

    const heading = screen.getByText(
      /test text/i
    );

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument();
  });
});