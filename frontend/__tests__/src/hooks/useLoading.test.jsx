import { renderHook, act, render } from "@testing-library/react";
import { useLoading } from "@/hooks/useLoading";

jest.mock("@/components/Spinner", () => {
  const Spinner = () => <div data-testid="spinner">Spinner</div>;
  Spinner.displayName = "Spinner";
  return Spinner;
});

describe("useLoading hook", () => {
  test("should initialize with loading set to false", () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.loading).toBe(false);
  });

  test("should set loading to true when setLoading receives that value", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });

  test("should render the Spinner when loading is true", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(true);
    });

    const { container } = render(result.current.renderSpinner());
    expect(
      container.querySelector('[data-testid="spinner"]')
    ).toBeInTheDocument();
  });

  test("should not render the Spinner when loading is false", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(false);
    });

    const { container } = render(result.current.renderSpinner());
    expect(
      container.querySelector('[data-testid="spinner"]')
    ).not.toBeInTheDocument();
  });
});
