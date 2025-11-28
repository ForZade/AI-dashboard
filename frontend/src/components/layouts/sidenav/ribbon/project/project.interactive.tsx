import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Project from "./project";
import { safe } from "@/lib/safe.utils";
import { api } from "@/lib/axios.client";
import { handleError } from "@/lib/error.handler";

export default function ProjectInteractive({ project, size }: { project: any, size?: "defalut" | "sm" | "lg" }) {
    const deleteProject = async () => {
        const [, deleteError] = await safe(api.delete(`/api/v1/projects/${project.id}`));
        if (deleteError) return handleError(deleteError);

        return;
    }

    return (
        <Tooltip>
            <ContextMenu>
                <ContextMenuTrigger>
                    <TooltipTrigger className="rounded-full">
                        <Project project={project} size={size}/>
                    </TooltipTrigger>
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuItem>
                        Edit
                    </ContextMenuItem>

                    <ContextMenuItem variant="destructive" onClick={deleteProject}>
                        Delete project
                    </ContextMenuItem>

                    <hr className="w-full border border-foreground/10 my-1"/>

                    <ContextMenuItem>
                        Copy Project Id
                    </ContextMenuItem>
                </ContextMenuContent>

            </ContextMenu>

            <TooltipContent side="right" className="text-sm font-bold">
                {project.name}
            </TooltipContent>
        </Tooltip>
    )
}