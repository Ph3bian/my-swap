import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Card.module.scss";

const CardItem = ({
  children,
  className,
  variant=""
}: PropsWithChildren<{
  className?: string;
  variant?:string
}>): JSX.Element => {
  return <div className={clsx(styles.CardItem,styles[variant], className)}>{children}</div>;
};

export default CardItem;
