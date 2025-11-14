import { NextRequest } from "next/server";
import { ProjectsController } from "@/features/projects/projects.controller";

const projectsController = new ProjectsController();

export async function GET() {
    return await projectsController.getAllProjects();
}

export async function POST(req: NextRequest) {
    return await projectsController.createNewProject(req);
}