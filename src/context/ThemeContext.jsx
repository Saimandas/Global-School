import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (value) => {
      const current = value === "system" ? getSystemTheme() : value;

      root.classList.remove("light", "dark");
      root.classList.add(current);
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (theme === "system") applyTheme("system");
    };

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};