import { FC, useEffect, useState } from "react";

import { handleTheme } from "./functions";
import { SunShineIcon, MoonIcon } from "assets/svg";

import styles from "./PageLayout.module.scss";

const theme = localStorage.getItem("theme");

interface PageLayoutProps {
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  const [icon, setIcon] = useState(theme && theme === "dark" ? "moon" : "sun");

  const rootElement = document.getElementById("root");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      rootElement?.setAttribute(
        "data-theme",
        localStorage.getItem("theme") ?? "light"
      );
    }
  }, [rootElement]);
  return (
    <div className={styles.PageLayout}>
      <div className={styles.PageLayoutHeader}>
        <h3>My Swap</h3>
        <div onClick={() => handleTheme(setIcon)}>
          {icon === "moon" ? <SunShineIcon /> : <MoonIcon />}
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};
export default PageLayout;
