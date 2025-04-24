'use client'

import { Search } from "lucide-react"
import { useState } from "react"

import { ToolCard } from "@/components/tool-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import tools from "@/lib/tools"

// Get unique categories
const categories = [...new Set(tools.map((tool) => tool.category))]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter tools based on selected category
  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">RockLeon's Toolbox</h1>
        <p className="text-muted-foreground">A collection of handy tools for developers and IT professionals</p>
      </header>

      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tools..." />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={!selectedCategory ? "bg-gray-200" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gray-200" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.path} tool={tool} />
        ))}
      </div>
    </div>
  )
}
