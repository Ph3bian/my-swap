import { FC } from "react";
import clsx from "clsx";
import styles from "./Card.module.scss";

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={clsx(styles.Card, className)}>{children}</div>;
};
export default Card;
