import clsx from "clsx";
import { FC } from "react";

import styles from "./Chips.module.scss";

interface ChipsProps {
  variant?: string;
  className?: string;
  onClick?: () => void;
}

const Chips: FC<ChipsProps> = ({
  children,
  className,
  onClick,
  variant = "",
}) => (
  <span
    onClick={onClick}
    className={clsx(styles.Chips, styles[variant], className)}
  >
    {children}
  </span>
);

export default Chips;
