"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  color: string;
  colorAlpha: string;
}

export default function HeroSection({ color, colorAlpha }: HeroSectionProps) {
  const [bgColor, setBgColor] = useState(color);
  const [bgAlphaColor, setBgAplphaColor] = useState(colorAlpha);

  useEffect(() => {
    setBgColor(color);
    setBgAplphaColor(colorAlpha);
  }, [color, colorAlpha]);

  return (
    <div className="flex gap-20 items-center">
      <div
        className="w-full rounded-4xl overflow-clip relative p-6 min-h-[26rem] h-full transition-colors duration-200"
        style={{
          backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      >
        <div
          className="absolute inset-0 rounded z-0"
          style={{ backgroundColor: bgColor }}
        />
        <nav className="relative z-20 flex justify-between items-center border-b pb-6 border-border/50">
          <h1 className="text-white/90 text-lg drop-shadow-md font-semibold">
            shadcn-input-color
          </h1>
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href="https://github.com/vatsalpipalava/shadcn-input-color/blob/main/src/components/input-color.tsx">
              <GithubIcon />
            </Link>
          </Button>
        </nav>
        <div className="flex w-full h-96 items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto flex items-center justify-center flex-col gap-4">
            <div className="bg-white text-black flex items-center justify-center h-6 px-2 text-xs rounded-full font-medium">
              shadcn/ui component
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
              Color Picker
            </h1>
            <p className="text-white/90 text-lg drop-shadow-md">
              A beautiful and accessible color picker built with shadcn/ui and
              React Colorful
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full rounded-4xl  overflow-clip  relative p-6 min-h-[26rem] h-full transition-colors duration-200"
        style={{
          backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      >
        <div
          className="absolute inset-0 rounded z-0"
          style={{ backgroundColor: bgAlphaColor }}
        />
        <nav className="relative z-20 flex justify-between items-center border-b pb-6 border-border/50">
          <h1 className="text-white/90 text-lg drop-shadow-md font-semibold">
            shadcn-input-color
          </h1>
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href="https://github.com/vatsalpipalava/shadcn-input-color/blob/main/src/components/input-color.tsx">
              <GithubIcon />
            </Link>
          </Button>
        </nav>
        <div className="flex w-full h-96 items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto flex items-center justify-center flex-col gap-4">
            <div className="bg-white text-black flex items-center justify-center h-6 px-2 text-xs rounded-full font-medium">
              shadcn/ui component
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
              Color Picker Alpha
            </h1>
            <p className="text-white/90 text-lg drop-shadow-md">
              A beautiful and accessible color picker built with shadcn/ui and
              React Colorful
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
