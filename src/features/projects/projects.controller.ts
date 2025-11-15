import { ProjectsService } from '@/services/projects.service';
import { safe } from '@/lib/result.util';
import { requireAuth } from '@/lib/auth.api';
import { handleError } from '@/lib/errors/response.error';
import { NextRequest, NextResponse } from 'next/server';
import { createProjectSchema } from './projects.validation';

const projectsService = new ProjectsService();

export class ProjectsController {
  async getAllProjects() {
    const [userId, authError] = await safe(requireAuth());
    if (authError) return handleError(authError);

    const [projects, projectsError] = await safe(projectsService.getProjects(userId));
    if (projectsError) return handleError(projectsError);

    return NextResponse.json(projects, { status: 200 });
  }

  async createNewProject(req: NextRequest) {
    const [userId, authError] = await safe(requireAuth());
    if (authError) return handleError(authError);

    const [body, bodyError] = await safe(req.json());
    if (bodyError) return handleError(bodyError);

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      return handleError(validation.error);
    }

    const data = {
      ...validation.data,
      user_id: userId,
    };

    const [project, projectError] = await safe(projectsService.createProject(data));
    if (projectError) return handleError(projectError);

    return NextResponse.json(project, { status: 201 });
  }
}
