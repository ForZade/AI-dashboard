import { FastifyInstance } from "fastify";
import { authMiddleware, validateBody } from "../../middleware";
import { projectsController } from "./projects.controller";
import { createProjectSchema, CreateProjectType, updateProjectSchema, UpdateProjectType } from "./projects.validator";

export default function projectsRoutes(fastify: FastifyInstance) {
    fastify.get(
        "/",
        { preValidation: authMiddleware },
        projectsController.getAllProjects,
    );

    fastify.post<{ Body: CreateProjectType }>(
        "/",
        { preValidation: [authMiddleware, validateBody(createProjectSchema)] },
        projectsController.createNewProject,
    );

    fastify.get<{ Params: { id: string } }>(
        "/:id",
        { preValidation: authMiddleware },
        projectsController.getProjectChats,
    )

    fastify.patch<{ Body: UpdateProjectType, Params: { id: string } }>(
        "/:id",
        { preValidation: [authMiddleware, validateBody(updateProjectSchema)]},
        projectsController.updateProject,
    );

    fastify.delete<{ Params: { id: string }}>(
        "/:id",
        { preValidation: authMiddleware },
        projectsController.deleteProject
    );
}