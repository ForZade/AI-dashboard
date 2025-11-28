"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useOverlay } from "@/contexts/useOverlays";
import { Plus } from "lucide-react"

export function CreateProjectButton() {
    const { openModal } = useOverlay();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button 
                    className="p-2 rounded-full bg-c-gray/20 hover:bg-c-gray/30 transition-colors cursor-pointer"
                    onClick={() => openModal()}
                >
                    <Plus className="size-6 text-c-gray" strokeWidth={2}/>
                </button>
            </TooltipTrigger>
            
            <TooltipContent side="right">
                <h1 className="text-sm">Create Project</h1>
            </TooltipContent>
        </Tooltip>
    )
}