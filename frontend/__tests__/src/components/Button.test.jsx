import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button component", () => {
  const defaultProps = {
    label: "Mock button",
    onClick: jest.fn(),
  };

  it("should render with the correct label", () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it("should apply custom styles if provided", () => {
    const customStyles = "mockStyle";

    render(<Button {...defaultProps} styles={customStyles} />);

    expect(screen.getByText(defaultProps.label).className).toContain(
      customStyles
    );
  });

  it("should apply the correct styles based on the type prop", () => {
    const { container: primaryContainer } = render(
      <Button {...defaultProps} type="primary" />
    );
    const primaryButton = primaryContainer.querySelector("button");
    expect(primaryButton).toHaveClass("bg-brand-primary");

    const { container: secondaryContainer } = render(
      <Button {...defaultProps} type="secondary" />
    );
    const secondaryButton = secondaryContainer.querySelector("button");
    expect(secondaryButton).toHaveClass("border-black");
  });

  it("should be disabled and apply the disabled styles when the disabled prop is true", () => {
    render(<Button {...defaultProps} disabled={true} />);

    const buttonElement = screen.getByText(defaultProps.label);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("cursor-not-allowed");
    expect(buttonElement).toHaveClass("opacity-50");
  });

  it("should call onClick when clicked", () => {
    render(<Button {...defaultProps} />);

    const buttonElement = screen.getByText(defaultProps.label);
    fireEvent.click(buttonElement);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
