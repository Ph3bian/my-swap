import { useRef, useCallback, useEffect, FC } from "react";
import styles from "./Modal.module.scss";
import { CloseIcon } from "../../assets/svg";

export interface ModalProps {
  title: string;
  show?: boolean;
  handleShow: (a: boolean) => void;
  hasHeader?: boolean;
}

const Modal: FC<ModalProps> = ({
  children,
  title,
  handleShow,
  show,
  hasHeader = true,
}) => {
  const node = useRef<HTMLDivElement>(null);

  const handleHide = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        handleShow(!show);
        return;
      }
    },
    [handleShow, show]
  );
  const handleClick = useCallback(
    (event: any) => {
      if (node.current && !node.current.contains(event.target as Node)) {
        handleShow(!show);
        return;
      }
    },
    [handleShow, show]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleHide);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleHide);
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick, handleHide]);

  return (
    <div role="dialog" className={styles.Modal}>
      <div className={styles.ModalContent} ref={node}>
        {hasHeader && (
          <div className={styles.header}>
            <h3>{title}</h3>
            <CloseIcon
              role="button"
              onKeyDown={() => handleShow(!show)}
              onClick={() => handleShow(!show)}
            />
          </div>
        )}
        <div className={styles.body}>
          <div className={styles.bodyContent}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
