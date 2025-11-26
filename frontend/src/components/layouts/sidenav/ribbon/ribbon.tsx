import { CreateProjectButton } from "./createProject";
import Project from "./projects";

const project = {
    color: "yellow",
    icon: "chat",
    name: "test"
}

export default function Ribbon() {
    return (
        <nav className="w-16 h-full p-2 flex flex-col items-center gap-2">
            <Project project={project}/>
            <hr className="w-full border border-foreground/10"/>
            <CreateProjectButton/>
        </nav>
    )
}