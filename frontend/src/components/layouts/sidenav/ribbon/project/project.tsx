"use client";

import { getIcon } from "@/lib/ui/icons";
import { COLOR_MAP } from "@/lib/ui/colors";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";

export default function Project({ project, size, onClick }: { project: any, size?: "defalut" | "sm" | "lg", onClick?: () => void }) {
    const [hovered, setHovered] = useState(false);
    const Icon = getIcon(project.icon || "home");

    const selectedColor = COLOR_MAP[project.color] ||  COLOR_MAP["gray"];

    return (
        <div
            className={`
                rounded-full group duration-200 cursor-pointer w-min h-min
                ${size === "sm" ? "p-1" : size === "lg" ? "p-5.5" : "p-2.5"}
            `} 
            style={{ background: selectedColor + (hovered ? "40" : "20")}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <Icon color={selectedColor} weight="Bold" size={size === "sm" ? 8 : size === "lg" ? 44 : 20}/>
        </div>
    )
}