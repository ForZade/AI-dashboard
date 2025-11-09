import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode}) {
    return (
        <>
            <h1>Dashboard layout</h1>
            {children}
        </>
    )
}