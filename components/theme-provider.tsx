"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextProps {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme,
  enableSystem,
}: { children: React.ReactNode; attribute: string; defaultTheme: string; enableSystem: boolean }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
      return storedTheme || (defaultTheme as "light" | "dark" | "system")
    }
    return defaultTheme as "light" | "dark" | "system"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      if (attribute === "class") {
        document.documentElement.classList.remove("light", "dark")
        if (theme !== "system") {
          document.documentElement.classList.add(theme)
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark")
        }
      }
    }
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
