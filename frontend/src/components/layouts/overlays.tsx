"use client";

import { useOverlay } from "@/contexts/useOverlays"
import Modal from "./modal/modal";

export default function Overlays() {
    const { open } = useOverlay();

    return (
        <>
            {open && <Modal />}
        </>
    )
}