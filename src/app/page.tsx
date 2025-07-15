"use client";

import { useState } from "react";
import InputColor from "@/components/input-color";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const [color, setColor] = useState("#FF0000");
  const [colorWithAlpha, setColorWithAlpha] = useState("#FF0000FF");

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-8">
          <HeroSection color={color} colorAlpha={colorWithAlpha} />

          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">Pick a Color</h2>
                <div className="flex justify-center gap-20">
                  <InputColor
                    label="Background Color with Alpha"
                    value={color}
                    onChange={setColor}
                    onBlur={() => console.log("color picker")}
                    className="mt-0"
                  />

                  <InputColor
                    label="Background Color with Alpha"
                    value={colorWithAlpha}
                    onChange={setColorWithAlpha}
                    onBlur={() => console.log("Alpha color picker blurred")}
                    alpha={true}
                    className="mt-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Built with Next.js, shadcn/ui, and React Colorful</p>
            <p className="mt-1">
              <a
                href="https://github.com/vatsalpipalava/shadcn-input-color/blob/main/src/components/input-color.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
