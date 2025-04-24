"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function Base64Tool() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("encode")

  const handleProcess = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for the selected operation",
        variant: "destructive",
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    })
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
          <CardTitle>Base64 Encoder/Decoder</CardTitle>
          <CardDescription>Convert text to and from Base64 encoding</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encode" className="w-full" onValueChange={(value) => setMode(value)}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div>
                <label htmlFor="input" className="mb-2 block text-sm font-medium">
                  Input
                </label>
                <Textarea
                  id="input"
                  placeholder={mode === "encode" ? "Enter text to encode" : "Enter Base64 to decode"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="flex justify-center">
                <Button onClick={handleProcess}>{mode === "encode" ? "Encode" : "Decode"}</Button>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="output" className="block text-sm font-medium">
                    Output
                  </label>
                  {output && (
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  )}
                </div>
                <Textarea id="output" value={output} readOnly rows={5} />
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
