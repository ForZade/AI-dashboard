import Overlays from "@/components/layouts/overlays";
import Ribbon from "@/components/layouts/sidenav/ribbon/ribbon";
import { OverlayProvider } from "@/contexts/useOverlays";

export default function DashboardLayout() {
    

    return (
        <OverlayProvider>
            <Overlays/>

            <main className="w-screen h-screen flex">
                <Ribbon/>
            </main>
        </OverlayProvider>
    )
}