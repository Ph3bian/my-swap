import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Button, { ButtonProps } from "./Button";

const defaultProps = {
  onClick: jest.fn(),
  className: "",
};

const renderComponent = (props?: Partial<ButtonProps>) =>
  render(<Button {...defaultProps} {...props} />);

describe("ButtonBase", () => {
  afterEach(jest.clearAllMocks);

  it("should render correctly", () => {
    const { baseElement } = renderComponent();

    expect(baseElement).toBeTruthy();
  });

  it("Should call the onClick handler when it is provided", () => {
    renderComponent();

    userEvent.click(screen.getByRole("button"));

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("Should handle loading state", () => {
    renderComponent({ isLoading: true });

    expect(screen.queryByText(/loading.../)).toBeInTheDocument();
  });

  it("Should handle disabled state", () => {
    renderComponent({ isDisabled: true });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("Should handle isDisabled state", () => {
    renderComponent({
      isDisabled: true,
    });

    userEvent.click(screen.getByRole("button"));

    expect(defaultProps.onClick).toHaveBeenCalledTimes(0);
  });
  it("should handle composing className", () => {
    const screen = renderComponent({
      className: "swap-btn",
      dataTest: "btn",
    });

    expect(screen.getByTestId("btn")).toHaveClass("swap-btn");
  });
});
