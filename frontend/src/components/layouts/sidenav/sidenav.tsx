import ChatNav from "./chatnav/chatnav";
import Ribbon from "./ribbon/ribbon";

export default function Sidenav() {
    return (
        <div className="w-full h-full flex py-4">
            <Ribbon/>
            <ChatNav/>
        </div>
    )
}