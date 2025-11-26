import { Plus } from "lucide-react"

export function CreateProjectButton() {
    return (
        <button className="p-2 rounded-full bg-c-gray/20 hover:bg-c-gray/30 transition-colors cursor-pointer">
            <Plus className="size-6 text-c-gray" strokeWidth={2}/>
        </button>
    )
}