import { FC } from "react";
import styles from "./ListGroup.module.scss";
const ListGroup: FC = ({ children }) => (
  <ul className={styles.ListGroup}>{children}</ul>
);
export default ListGroup;
