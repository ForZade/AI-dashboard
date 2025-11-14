"use client";

import { useUIStore } from "@/stores/ui.store";
import { useEffect } from "react";

export default function ThemeProvider() {
    const theme = useUIStore((state) => state.theme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return null;
}