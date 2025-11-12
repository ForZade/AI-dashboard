import Project from "./project";
import Folder from "./folder";
import { Plus } from "lucide-react";

const projects = [
    {
        name: "Test",
        id: BigInt(123),
        user_id: BigInt(321),
        icon: "chat",
        color: "pink",
        created_at: Date.now(),
    },
    {
        name: "Test",
        id: BigInt(1234),
        user_id: BigInt(4321),
        icon: "home",
        color: "blue",
        created_at: Date.now(),
    }
]

export default function Ribbon() {
    return (
        <nav className="w-min h-full overflow-y-scroll overflow-x-hidden bg-background-dark p-2 flex flex-col items-center gap-2">
            <hr className="w-full border-foreground/10 border"/>
            <Project project={projects[1]}/>
            <Folder projects={projects} folderId={BigInt(543)}/>

            <hr className="w-full border-foreground/10 border"/>

            <button className="p-2 rounded-full bg-c-gray/20 hover:bg-c-gray/30 transition-colors cursor-pointer">
                <Plus className="size-6 text-c-gray" strokeWidth={2}/>
            </button>
        </nav>
    )
}