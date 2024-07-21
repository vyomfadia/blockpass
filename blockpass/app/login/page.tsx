"use client";

import LoginButton from "@/app/(components)/LoginButton";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";
import { listAllEvents } from "@/app/(lib)/event_manager";
import NavigationBar from "../(components)/NavigationBar";

function EventBox({ event }) {
  return (
    <div className="w-full rounded-lg border p-2">
      <p className="text-[24px]">{event.name}</p>
    </div>
  );
}

export default function Login() {
  const authSession = useSession();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (authSession.status === "authenticated") {
      listAllEvents().then((events) => {
        setEvents(events);
      });
      return;
    }

    if (authSession.status === "loading") {
      return;
    }

    if (!authSession.data) {
      console.log("no auth session detect");
    }
  }, [authSession.data, authSession.status]);

  return (
    <main className="py-7 h-full overflow-hidden">
      <NavigationBar />
      {authSession.status === "authenticated" ? (
        <div className="max-w-[1200px] mx-auto">
          <span className="font-medium text-[24px]">{"Your Tickets"}</span>
          <div className="flex flex-col gap-4">
            {events.map((event, i) => (
              <EventBox key={i} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}
