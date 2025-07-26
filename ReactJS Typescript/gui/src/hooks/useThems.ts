// // src/hooks/useTheme.ts
// import { useEffect, useState } from "react";

// export const useTheme = () => {
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") as
//       | "light"
//       | "dark"
//       | null;
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
//     if (storedTheme) {
//       setTheme(storedTheme);
//       document.documentElement.setAttribute("data-theme", storedTheme);
//     } else {
//       const defaultTheme = prefersDark ? "dark" : "light";
//       setTheme(defaultTheme);
//       document.documentElement.setAttribute("data-theme", defaultTheme);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   return { theme, toggleTheme };
// };
// src/hooks/useTheme.ts
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
};
