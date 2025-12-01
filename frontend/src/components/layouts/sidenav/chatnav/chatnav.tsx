"use client";

import { Ghost, PenNewSquare, SidebarMinimalistic, Magnifer, AltArrowDown } from "@solar-icons/react";
import ChatButton from "./chatButton";

const categories = [
    {
        name: "Pinned",
        id: "123",
        items: [
            { name: "Lorem ipsum dolor sit amet", id: "123" },
            { name: "Vivamus at orci est", id: "234" },
            { name: "convallis vel", id: "345" },
        ],
    },
    {
        name: "Chats",
        id: "321",
        items: [
            { name: "Mauris nec eros id nunc congue euismod", id: "456" },
            { name: "In egestas orci quis lorem tempus, vulputate sollicitudin enim ullamcorper", id: "567" },
            { name: "Nulla consequat sit amet quam eu convallis", id: "678" },
        ]
    }
];

export default function ChatNav() {
    return (
        <div className="w-full h-full bg-background-surface/75 p-2 pt-3 flex flex-col gap-8 rounded-2xl">
            <header className="flex justify-between items-center w-full text-foreground px-4">
                <h1 className="font-bold">Logo</h1>

                <button className="p-2 hover:bg-foreground/5 transition-colors rounded-lg">
                    <SidebarMinimalistic size={20}/>
                </button>
            </header>

            <div className="flex flex-col text-sm text-foreground px-2 gap-1">
                <div className="flex gap-2">
                    <ChatButton icon={PenNewSquare} menu={false}>
                        <span>New Chat</span>
                    </ChatButton>

                    {/* <button className="rounded-lg hover:bg-foreground/5 transition-colors p-1.5">
                        <div className="rounded-full p-1.5 border border-accent-bronze-dark border-dashed">
                            <Ghost weight="Bold" size={20} />
                        </div>
                    </button> */}
                </div>

                {/* <ChatButton icon={Magnifer} menu={false}>
                    Search
                </ChatButton> */}
            </div>

            <div className="flex flex-col px-2 gap-8">
                {
                    categories.map(category => (
                        <section 
                            key={category.id}
                            className="flex flex-col gap-1"
                        >
                            <header className="flex gap-1 text-foreground/50 items-center">
                                <h1 className="text-sm font-bold">{category.name}</h1>
                            </header>

                            <div className="flex flex-col text-foreground/90">
                                {category.items.map(item => (
                                    <ChatButton 
                                        key={item.id}
                                        className="p-2"
                                    >
                                        {item.name}
                                    </ChatButton>
                                ))}
                            </div>
                        </section>
                    ))
                }
            </div>
        </div>
    )
}