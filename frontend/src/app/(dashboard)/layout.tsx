import Overlays from "@/components/layouts/overlays";
import Ribbon from "@/components/layouts/sidenav/ribbon/ribbon";
import { OverlayProvider } from "@/contexts/useOverlays";
import { ProjectsProvider } from "@/contexts/useProjects";

export default function DashboardLayout() {
    

    return (
        <OverlayProvider>
            <ProjectsProvider>
                <Overlays/>

                <main className="w-screen h-screen flex">
                    <Ribbon/>
                </main>
            </ProjectsProvider>
        </OverlayProvider>
    )
}