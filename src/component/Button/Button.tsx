import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import { LoadingIcon } from "assets/svg";

import styles from "./Button.module.scss";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  dataTest?: string;
  variant?: string;
  isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  isDisabled,
  children,
  isLoading,
  className,
  dataTest,
  variant = "primary",
  isFullWidth,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      data-testid={dataTest}
      disabled={isDisabled}
      className={clsx(styles.Button, className, styles[variant], {
        [styles.isFullWidth]: isFullWidth,
      })}
    >
      {isLoading ? <LoadingIcon /> : children}
    </button>
  );
};

export default Button;
