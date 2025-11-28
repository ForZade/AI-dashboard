"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectsContextType {
  projects: any,
  loadProjects: (projects: any) => void;
  addProject: (projects: any) => void; 
}

interface Project {
    id: string,
    name: string,
    icon: string,
    color: string,
    position: number,
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used within ProjectsProvider");
  return context;
};

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = (projects: any) => {
    setProjects(projects);
  }

  const addProject = (project: any) => {
    setProjects(prev => [...prev, project]);
  }

  return (
    <ProjectsContext.Provider value={{ projects, loadProjects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};
