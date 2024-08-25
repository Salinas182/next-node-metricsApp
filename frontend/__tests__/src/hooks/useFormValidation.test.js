import { renderHook } from "@testing-library/react";
import useFormValidation from "@/hooks/useFormValidation";

describe("useFormValidation hook", () => {
  it("should return valid as true if all form fields are filled", () => {
    const formValues = {
      name: "Mock metric",
      value: "5",
    };

    const { result } = renderHook(() => useFormValidation(formValues));
    const { validateForm } = result.current;

    const { valid } = validateForm();

    expect(valid).toBe(true);
  });

  it("should return valid as false if any form field is empty", () => {
    const formValues = {
      name: "Mock metric",
      value: "",
    };

    const { result } = renderHook(() => useFormValidation(formValues));
    const { validateForm } = result.current;

    const { valid } = validateForm();

    expect(valid).toBe(false);
  });
});
