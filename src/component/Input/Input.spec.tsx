import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input, { InputProps } from "./Input";

const dataTest = "swap-input";
const defaultProps = {
  checked: false,
  disabled: false,
  id: "some-unique-id",
  onChange: jest.fn(),
  dataTest,
};

const renderInput = (props?: Partial<InputProps>) =>
  render(<Input {...defaultProps} {...props} />);

describe("Input", () => {
  it("should render successfully", () => {
    const { baseElement } = renderInput();
    expect(baseElement).toBeInTheDocument();
  });

  describe("event handlers", () => {
    it("should update value onChange", () => {
      const { getByTestId } = renderInput();

      userEvent.type(getByTestId(dataTest), "Hello");

      expect(getByTestId(dataTest)).toHaveValue("Hello");
      expect(defaultProps.onChange).toBeCalled();
    });


    it("should NOT call onChange handler if disabled", () => {
      const { getByTestId } = renderInput({ disabled: true });

      userEvent.type(getByTestId(dataTest), "Hello");

      expect(getByTestId(dataTest)).not.toHaveValue("Hello");
    });

    it("should NOT focus if disabled", () => {
      const onBlur = jest.fn();
      const onFocus = jest.fn();
      const { getByTestId } = renderInput({
        onBlur,
        onFocus,
        disabled: true,
      });

      userEvent.tab({ focusTrap: getByTestId(dataTest) });

      expect(onFocus).toBeCalledTimes(0);
    });
  });
});
