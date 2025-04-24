import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ToolCardProps {
  tool: {
    id: string
    name: string
    description: string
    icon: string
    category: string
  }
  className?: string
}

export function ToolCard({ tool, className }: ToolCardProps) {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[tool.icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <Link href={`/tools/${tool.id}`}>
      <Card className={cn("h-full transition-all hover:shadow-md", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <Badge variant="outline">{tool.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-1 font-semibold">{tool.name}</h3>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <span className="text-xs text-muted-foreground">Click to use</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
