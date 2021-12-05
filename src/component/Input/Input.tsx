import clsx from "clsx";
import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  variant?: string;
  error?: string;
  dataTest?: string;
}

const Input: FC<InputProps> = ({
  variant = "",
  dataTest = "swap-input",
  label,
  error = "",
  ...props
}) => (
  <>
    {label && <label>{label}</label>}
    <div className={styles.Container}>
      <input
        {...props}
        className={clsx(styles.Input, styles[variant])}
        data-testid={dataTest}
      />
      <small className={styles.error}>{error}</small>
    </div>
  </>
);
export default Input;
