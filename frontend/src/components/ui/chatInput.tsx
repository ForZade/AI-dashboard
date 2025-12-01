"use client";

import { useRef } from "react";

export default function ChatInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="bg-background-contrast p-4 rounded-lg text-foreground/50 flex items-center gap-8 border border-foreground/20 shadow-md"
            onClick={focusInput}
        >
            <input
                ref={inputRef}
                type="text"
                className="w-full outline-none text-foreground"
                placeholder="Message"
            />
        </div>
    );
}
