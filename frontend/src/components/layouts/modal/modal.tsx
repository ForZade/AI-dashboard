import { useOverlay } from "@/contexts/useOverlays"
import { useEffect } from "react";
import { CreateProjectForm } from "./createProject.form";
import { ProjectsProvider } from "@/contexts/useProjects";

export default function Modal() {
    const { closeModal, editingId } = useOverlay();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])

    return (
        <main 
            className="w-screen h-screen absolute top-0 left-0 bg-black/30 backdrop-blur-md grid place-items-center"
            onClick={closeModal}
        >
            <div
                className="w-min h-min bg-[#29292B] rounded-2xl p-8 flex flex-col items-center gap-4"
                onClick={e => e.stopPropagation()}
            >
                {
                    editingId ? <h1>Editing</h1> : <CreateProjectForm/>
                }
            </div>
        </main>
    )
}