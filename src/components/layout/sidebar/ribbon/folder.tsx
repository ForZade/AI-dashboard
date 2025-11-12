"use client";

import { Folder2 } from "@solar-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Project from "./project";

export default function Folder({ projects, folderId }: { projects: any, folderId: BigInt }) {
    const [open, setOpen] = useState(true);

    const toggleFolder = () => {
        setOpen(prev => !prev);
    }

    return (
        <motion.div
            className="flex flex-col rounded-full bg-background w-min h-min overflow-hidden items-center justify-start gap-1 p-1"
        >
            <AnimatePresence mode="sync">
                <button 
                    className="size-10 min-w-10 min-h-10 rounded-full grid place-items-center"
                    onClick={toggleFolder}
                >
                    {
                        open ? <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="size-min"
                        >
                            <Folder2 className="size-4 text-accent" weight="Bold" />
                        </motion.div>
                        :
                        <div className="size-10 min-w-10 min-h-10 grid grid-cols-2 grid-rows-2 place-items-center">
                            {
                                projects.map((project: any, index: number) => {
                                    if (index < 4) {
                                        return (
                                            <motion.div 
                                                key={project.id}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="w-min h-min"
                                            >
                                                <Project project={project} size="sm" />
                                            </motion.div>
                                        )
                                    }
                                })
                            }
                        </div>
                    }
                </button>

            
                { open && <motion.div
                        key={Number(folderId)}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden flex flex-col items-center gap-1"
                    >
                        {projects.map((project: any) => {
                            if (open) {
                                return (
                                    <Project key={project.id} project={project} />
                                )
                            }
                        })}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}