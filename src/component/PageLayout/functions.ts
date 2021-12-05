export const handleTheme = (updateIcon: (x: string) => void) => {
  const root: any = document.getElementById("root");
  if (
    localStorage.getItem("theme") &&
    localStorage.getItem("theme") === "dark"
  ) {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    updateIcon("sun");
  } else {
    updateIcon("moon");
    localStorage.setItem("theme", "dark");
    root.setAttribute("data-theme", "dark");
  }
};
