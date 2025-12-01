import ChatInput from "@/components/ui/chatInput";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-full h-full flex flex-col">
            <div className="flex flex-col grow">
                {children}
            </div>

            <div className="w-full px-8">
                <ChatInput/>
            </div>
        </main>
    )
}