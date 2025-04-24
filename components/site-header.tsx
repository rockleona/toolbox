"use client"

import Link from "next/link"
import { Github, Moon, Sun, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Drawer } from "@/components/ui/drawer"
import { useState } from "react"
import tools from "@/lib/tools"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span className="inline-block font-bold">RockLeon's IT Toolbox</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/rockleona/toolbox" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </Button>
          </nav>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} className="sm:w-1/2">
        <div className="p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <ul className="mt-4 space-y-2">
            {tools.map((tool) => (
              <li key={tool.path}>
                <Link href={tool.path} className="text-blue-500 hover:underline">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </header>
  )
}
