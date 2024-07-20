"use client";

import Image from "next/image";
import { Event } from "../types";
import { useEffect, useRef, useState } from "react";
import { useOnScreen } from "../(hooks)/IsOnScreen";

export default function EventCard({
  className,
  event,
  size = "small"
}: {
  className?: string;
  event: Event;
  size?: "small" | "large";
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (!loaded && isOnScreen) {
      setLoaded(true);
    }
  }, [isOnScreen, loaded]);

  return (
    <div
      ref={ref}
      className={` ${className} w-full h-full overflow-hidden relative hover:to-[100%] group cursor-pointer translate-y-0 hover:-translate-y-1 duration-500`}
    >
      <div className="w-full absolute left-0 top-0 bg-gradient-to-t h-full from-[#000] to-slate-[#000]/0 to-[100%] group-hover:opacity-100 opacity-0 duration-300" />
      <div className={`w-full absolute left-0 bottom-0 p-8 ${size == "small" ? "group-hover:bottom-[20%]" : "group-hover:bottom-[15%]"} duration-300`}>
        <p className={`font-normal ${size == "small" ? "text-[32px]" : "text-[48px]"} text-foreground`}>{event.name}</p>
        <div className="flex justify-between">
          <p className="font-light text-[24px] text-foreground" suppressHydrationWarning>
            {event.location}, {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="font-light text-[24px] text-foreground" suppressHydrationWarning>
            {new Date(event.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div className="w-full absolute left-0 bottom-0 p-8 items-center grid grid-cols-[1fr_auto] gap-10 group-hover:translate-y-0 translate-y-[100%] duration-300">
        <p className="text-[12px] font-light text-foreground">
          {event.description}
        </p>
      </div>
      <Image
        width={806}
        height={453}
        alt={event.name}
        src={event.thumbnail}
        className=" w-full h-full"
      />
    </div>
  );
}
