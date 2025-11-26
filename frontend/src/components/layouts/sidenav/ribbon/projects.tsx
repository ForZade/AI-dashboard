"use client";

import { getIcon } from "@/lib/ui/icons";
import { COLOR_MAP } from "@/lib/ui/colors";

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