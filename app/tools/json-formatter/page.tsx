"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JsonFormatterTool() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [indentation, setIndentation] = useState("2")
  const [mode, setMode] = useState("format")
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    setError(null)

    if (!input.trim()) {
      setOutput("")
      return
    }

    try {
      // Parse the JSON to validate it
      const parsedJson = JSON.parse(input)

      if (mode === "format") {
        // Format with the selected indentation
        setOutput(JSON.stringify(parsedJson, null, Number.parseInt(indentation)))
      } else {
        // Minify (no spaces)
        setOutput(JSON.stringify(parsedJson))
      }
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : "Unknown error"}`)
      setOutput("")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)

    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to paste from clipboard",
        variant: "destructive",
      })
    }
  }

  const handleModeChange = (value: string) => {
    setMode(value)
    if (input) formatJson()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to tools
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>JSON Formatter</CardTitle>
          <CardDescription>Format, validate and minify JSON data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="format" className="w-full" onValueChange={handleModeChange}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="format">Format</TabsTrigger>
              <TabsTrigger value="minify">Minify</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="input" className="block text-sm font-medium">
                    Input JSON
                  </label>
                  <Button variant="outline" size="sm" onClick={handlePaste}>
                    Paste
                  </Button>
                </div>
                <Textarea
                  id="input"
                  placeholder="Enter JSON to format"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between gap-4">
                {mode === "format" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Indentation:</span>
                    <Select value={indentation} onValueChange={setIndentation}>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Spaces" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button onClick={formatJson} className="ml-auto">
                  {mode === "format" ? "Format JSON" : "Minify JSON"}
                </Button>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="output" className="block text-sm font-medium">
                    Formatted Output
                  </label>
                  {output && (
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <Textarea
                  id="output"
                  value={output}
                  readOnly
                  rows={12}
                  className="font-mono text-sm"
                  placeholder="Formatted JSON will appear here"
                />
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
