import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component", () => {
  const defaultProps = {
    name: "test-input",
    label: "Test Input",
    placeholder: "Enter text",
    value: "default value",
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  test("renders correctly with given props", () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder)
    ).toBeInTheDocument();
  });

  it("should call onChange when the input value changes", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByLabelText(defaultProps.label);

    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<Input {...defaultProps} disabled={true} />);

    const inputElement = screen.getByLabelText(defaultProps.label);

    expect(inputElement).toBeDisabled();
  });

  it("should render with custom styles, if provided", () => {
    const customStyles = {
      container: "custom-container",
      label: "custom-label",
      input: "custom-input",
    };

    render(<Input {...defaultProps} styles={customStyles} />);

    expect(screen.getByLabelText(defaultProps.label).className).toContain(
      customStyles.input
    );
  });

  test("ref is correctly attached", () => {
    const ref = React.createRef();
    render(<Input name="username" label="Username" ref={ref} />);

    expect(ref.current).toBeInTheDocument();
  });
});
