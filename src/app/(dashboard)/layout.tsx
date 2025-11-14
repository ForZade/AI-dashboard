import Ribbon from "@/components/layout/sidebar/ribbon/ribbon";
import ThemeProvider from "@/components/providers/theme.provider";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode}) {
    return (
        <main className="w-screen h-screen flex">
            <ThemeProvider/>
            <Ribbon/>
            {children}
        </main>
    )
}