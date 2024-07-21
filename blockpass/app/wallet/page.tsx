"use client";

import {useEffect, useLayoutEffect, useState} from "react";
import {listAllEvents} from "@/app/(lib)/event_manager";
import NavigationBar from "../(components)/NavigationBar";

function EventBox({event}) {
    return (
        <div className="w-full rounded-lg border p-2">
            <p className="text-[24px]">{event.name}</p>
        </div>
    );
}

export default function Login() {
    const [events, setEvents] = useState([]);

    return (
        <main className="py-7 h-full overflow-hidden">
            <NavigationBar/>
            <div className="max-w-[1200px] mx-auto grid grid-cols-[2fr_1fr]">
                <span className="font-medium text-[24px]">{"Your Tickets"}</span>
                <div className="flex flex-col gap-4">
                    {events.map((event, i) => (
                        <EventBox key={i} event={event}/>
                    ))}
                </div>
            </div>
        </main>
    );
}
