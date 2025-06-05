// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { HexColorPicker } from "react-colorful";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// export default function Home() {
//   const [colorFormat, setColorFormat] = useState("HEX");

//   return (
//     <div className="flex w-full min-h-screen h-full items-center justify-center">
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button className="w-12 h-12" size={"icon"}></Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-3">
//           <div className="color-picker">
//             <HexColorPicker className="!w-[244px] !aspect-square !h-[244px]" />
//             <div className="flex gap-3">
//               <Select value={colorFormat} onValueChange={setColorFormat}>
//                 <SelectTrigger className="w-16 !text-xs !h-7 px-2 py-1">
//                   <SelectValue placeholder="Color" />
//                 </SelectTrigger>
//                 <SelectContent className="min-w-20">
//                   <SelectItem value="HEX" className="text-xs">
//                     HEX
//                   </SelectItem>
//                   <SelectItem value="RGB" className="text-xs">
//                     RGB
//                   </SelectItem>
//                   <SelectItem value="HSL" className="text-xs">
//                     HSL
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//               {colorFormat === "HEX" ? (
//                 <Input className="h-7 text-sm w-[168px]" />
//               ) : (
//                 <div className="flex items-center">
//                   <Input className="rounded-r-none h-7 w-14" />
//                   <Input className="rounded-none h-7 w-14 " />
//                   <Input className="rounded-l-none h-7 w-14" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { PipetteIcon } from "lucide-react";

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export default function Home() {
  const [colorFormat, setColorFormat] = useState("HEX");
  const [color, setColor] = useState("#FF0000");
  const [colorValues, setColorValues] = useState<ColorValues>({
    hex: "#FF0000",
    rgb: { r: 255, g: 0, b: 0 },
    hsl: { h: 0, s: 100, l: 50 },
  });

  // Conversion utilities
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
        .toUpperCase()
    );
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Update all color formats when color changes
  const updateColorValues = (newColor: string) => {
    const rgb = hexToRgb(newColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    setColorValues({
      hex: newColor.toUpperCase(),
      rgb,
      hsl,
    });
  };

  // Handle color picker change
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateColorValues(newColor);
  };

  // Handle HEX input change
  const handleHexChange = (value: string) => {
    // Ensure it starts with # and convert to uppercase
    let formattedValue = value.toUpperCase();
    if (!formattedValue.startsWith("#")) {
      formattedValue = "#" + formattedValue;
    }

    // Limit to 7 characters (#XXXXXX)
    if (formattedValue.length > 7) {
      formattedValue = formattedValue.slice(0, 7);
    }

    // Validate hex format
    const hexRegex = /^#[0-9A-F]{6}$/;
    if (hexRegex.test(formattedValue)) {
      setColor(formattedValue);
      updateColorValues(formattedValue);
    } else if (formattedValue.length <= 7) {
      // Update display but don't convert until valid
      setColorValues((prev) => ({ ...prev, hex: formattedValue }));
    }
  };

  // Handle RGB input change
  const handleRgbChange = (component: "r" | "g" | "b", value: string) => {
    const numValue = Number.parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(255, numValue));

    const newRgb = { ...colorValues.rgb, [component]: clampedValue };
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const hsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);

    setColor(hex);
    setColorValues({ hex, rgb: newRgb, hsl });
  };

  // Handle HSL input change
  const handleHslChange = (component: "h" | "s" | "l", value: string) => {
    const numValue = Number.parseInt(value) || 0;
    let clampedValue;

    if (component === "h") {
      clampedValue = Math.max(0, Math.min(360, numValue));
    } else {
      clampedValue = Math.max(0, Math.min(100, numValue));
    }

    const newHsl = { ...colorValues.hsl, [component]: clampedValue };
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    setColor(hex);
    setColorValues({ hex, rgb, hsl: newHsl });
  };

  // Handle popover close
  const handlePopoverChange = (open: boolean) => {
    if (!open) {
      console.log("Current color:", {
        hex: colorValues.hex,
        rgb: colorValues.rgb,
        hsl: colorValues.hsl,
      });
      setColorFormat("HEX");
    }
  };

  // Check if EyeDropper API is available
  const isEyeDropperAvailable = () => {
    return typeof window !== "undefined" && "EyeDropper" in window;
  };

  // Handle eyedropper click
  const handleEyeDropper = async () => {
    if (!isEyeDropperAvailable()) {
      alert("Eyedropper is not supported in your browser");
      return;
    }

    try {
      // @ts-expect-error - TypeScript doesn't have types for EyeDropper yet
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      const pickedColor = result.sRGBHex;
      setColor(pickedColor);
      updateColorValues(pickedColor);
    } catch {
      console.log("User canceled the eyedropper");
    }
  };

  // Initialize color values on mount
  useEffect(() => {
    updateColorValues(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full min-h-screen h-full py-20 px-4 justify-center">
      <Popover onOpenChange={handlePopoverChange}>
        <PopoverTrigger asChild>
          <Button
            className="w-12 h-12"
            size={"icon"}
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="color-picker space-y-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-1.5 -left-1 z-10 flex items-center gap-1 h-7 w-7 bg-transparent hover:bg-transparent"
                onClick={handleEyeDropper}
                disabled={!isEyeDropperAvailable()}
              >
                <PipetteIcon className="h-3 w-3" />
              </Button>
              <HexColorPicker
                className="!w-[236px] !aspect-square !h-[236px]"
                color={color}
                onChange={handleColorChange}
              />
            </div>
            <div className="flex gap-2">
              <Select value={colorFormat} onValueChange={setColorFormat}>
                <SelectTrigger className="!w-[4.5rem] !text-sm !h-7 px-2 py-1">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent className="min-w-20">
                  <SelectItem value="HEX" className="text-sm">
                    HEX
                  </SelectItem>
                  <SelectItem value="RGB" className="text-sm">
                    RGB
                  </SelectItem>
                  <SelectItem value="HSL" className="text-sm">
                    HSL
                  </SelectItem>
                </SelectContent>
              </Select>

              {colorFormat === "HEX" ? (
                <Input
                  className="h-7 text-sm w-[156px]"
                  value={colorValues.hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#FF0000"
                  maxLength={7}
                />
              ) : colorFormat === "RGB" ? (
                <div className="flex items-center">
                  <Input
                    className="rounded-r-none h-7 w-13 text-center text-sm"
                    value={colorValues.rgb.r}
                    onChange={(e) => handleRgbChange("r", e.target.value)}
                    placeholder="255"
                    maxLength={3}
                  />
                  <Input
                    className="rounded-none h-7 w-13 text-center border-x-0 text-sm"
                    value={colorValues.rgb.g}
                    onChange={(e) => handleRgbChange("g", e.target.value)}
                    placeholder="255"
                    maxLength={3}
                  />
                  <Input
                    className="rounded-l-none h-7 w-13 text-center text-sm"
                    value={colorValues.rgb.b}
                    onChange={(e) => handleRgbChange("b", e.target.value)}
                    placeholder="255"
                    maxLength={3}
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <Input
                    className="rounded-r-none h-7 w-13 text-center text-sm"
                    value={colorValues.hsl.h}
                    onChange={(e) => handleHslChange("h", e.target.value)}
                    placeholder="360"
                    maxLength={3}
                  />
                  <Input
                    className="rounded-none h-7 w-13 text-center border-x-0 text-sm"
                    value={colorValues.hsl.s}
                    onChange={(e) => handleHslChange("s", e.target.value)}
                    placeholder="100"
                    maxLength={3}
                  />
                  <Input
                    className="rounded-l-none h-7 w-13 text-center text-sm"
                    value={colorValues.hsl.l}
                    onChange={(e) => handleHslChange("l", e.target.value)}
                    placeholder="100"
                    maxLength={3}
                  />
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
