"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  color: string;
}

export default function HeroSection({ color }: HeroSectionProps) {
  const [bgColor, setBgColor] = useState(color);

  useEffect(() => {
    setBgColor(color);
  }, [color]);

  return (
    <div
      className="w-full rounded-4xl p-6 min-h-[26rem] h-full transition-colors duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex justify-between items-center border-b pb-6 border-border/50">
        <h1 className="text-white/90 text-lg drop-shadow-md font-semibold">
          shadcn-input-color
        </h1>
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href="/">
            <GithubIcon />
          </Link>
        </Button>
      </nav>
      <div className="flex w-full h-96 items-center justify-center">
        <div className="max-w-3xl mx-auto flex items-center justify-center flex-col gap-4">
          <div className="bg-muted flex items-center justify-center h-6 px-2 text-xs rounded-full font-medium">
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
  );
}
