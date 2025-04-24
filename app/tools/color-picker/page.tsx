'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ColorPicker() {
  const [color, setColor] = useState("#000000");
  const { toast } = useToast();

  const randomColor = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    setColor(randomHex);
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} has been copied to clipboard.`,
    });
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Color Picker</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-2 text-sm text-muted-foreground">Click the color box to pick a color</p>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-20 border-none cursor-pointer"
          />
          <Button
            onClick={randomColor}
            className="mt-4"
          >
            Random Color
          </Button>
          <div className="mt-4 text-center space-y-2">
            <div className="flex justify-between cursor-pointer transition-colors duration-300 hover:bg-gray-100" onClick={() => copyToClipboard(color)}>
              <span className="font-medium">Hex:</span>
              <span>{color}</span>
            </div>
            <div className="flex justify-between cursor-pointer transition-colors duration-300 hover:bg-gray-100" onClick={() => copyToClipboard(hexToRgb(color))}>
              <span className="font-medium">RGB:</span>
              <span>{hexToRgb(color)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}