"use client";

import type { Project } from "@/db/postgres/prisma";
import { getIcon } from "@/lib/icons";

const COLOR_MAP: Record<string, string> = {
  turquoise: "#1ABC9C",
  green: "#2ECC71",
  blue: "#3498DB",
  purple: "#9B59B6",
  pink: "#E91E63",
  yellow: "#F1C40F",
  orange: "#E67E22",
  red: "#E74C3C",
  slate: "#607D8B",
  gray: "#95A5A6",
};


export default function Project({ project, size }: { project: any, size?: "defalut" | "sm" }) {
    const Icon = getIcon(project.icon || "home");

    const selectedColor = COLOR_MAP[project.color];

    return (
        <button
            className={`
                rounded-full group duration-200 cursor-pointer w-min h-min
                ${size === "sm" ? "p-1" : "p-2.5"}
            `} 
            style={{ background: selectedColor + "20",}}
        >
            <Icon color={selectedColor} weight="Bold" size={size === "sm" ? 8 : 20}/>
        </button>
    )
}