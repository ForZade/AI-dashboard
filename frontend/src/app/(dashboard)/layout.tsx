import Overlays from "@/components/layouts/overlays";
import Ribbon from "@/components/layouts/sidenav/ribbon/ribbon";
import ChatNav from "@/components/layouts/sidenav/chatnav/chatnav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { OverlayProvider } from "@/contexts/useOverlays";
import { ProjectsProvider } from "@/contexts/useProjects";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    

    return (
        <OverlayProvider>
            <ProjectsProvider>
                <Overlays/>

                <main className="w-screen h-screen">
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                        <Ribbon/>
                        <ResizablePanel defaultSize={16} minSize={12} maxSize={28} className="py-4">
                            <ChatNav/>
                        </ResizablePanel>

                        <ResizableHandle/>

                        <ResizablePanel className="py-4">
                            {children}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </main>

            </ProjectsProvider>
        </OverlayProvider>
    )
}