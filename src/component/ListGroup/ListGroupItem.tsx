import clsx from "clsx";
import { FC } from "react";
import styles from "./ListGroup.module.scss";

interface ListGroupItemProps {
  onClick?: () => void;
  hasEvent?: boolean;
  className?: string;
}
const ListGroupItem: FC<ListGroupItemProps> = ({
  children,
  onClick,
  hasEvent,
  className,
}) => (
  <li
    onClick={onClick}
    className={clsx(
      styles.ListGroupItem,
      className,
      hasEvent && styles["hasEvent"]
    )}
  >
    {children}
  </li>
);

export default ListGroupItem;
