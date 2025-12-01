import Overlays from "@/components/layouts/overlays";
import Ribbon from "@/components/layouts/sidenav/ribbon/ribbon";
import Sidenav from "@/components/layouts/sidenav/sidenav";
import { OverlayProvider } from "@/contexts/useOverlays";
import { ProjectsProvider } from "@/contexts/useProjects";

export default function DashboardLayout() {
    

    return (
        <OverlayProvider>
            <ProjectsProvider>
                <Overlays/>

                <main className="w-screen h-screen flex max-w-80">
                    <Sidenav/>
                </main>
            </ProjectsProvider>
        </OverlayProvider>
    )
}