import Ribbon from "@/components/layout/sidebar/ribbon/ribbon";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode}) {
    return (
        <main className="w-screen h-screen flex">
            <Ribbon/>
        </main>
    )
}