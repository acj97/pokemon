/** @jest-environment jsdom */
import { render, screen } from "./test-utils";
import Modal from "@pages/components/modal";

describe("Modal", () => {
  it("should render the children", () => {
    render(<Modal>
        <p>test text</p>
      </Modal>);

    const heading = screen.getByText(
      /test text/i
    );

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument();
  });
});