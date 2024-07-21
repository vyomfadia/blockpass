"use client";

import Image from "next/image";
import { Event } from "../types";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useOnScreen } from "../(hooks)/IsOnScreen";

export default function EventCard({
  className,
  event,
  setEvent,
}: {
  className?: string;
  event: Event;
  setEvent: Dispatch<SetStateAction<Event | null>>
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
      onClick={() => setEvent(event)}
      className={` ${className} w-[280px] snap-start bg-[#fff1] h-[500px] overflow-hidden relative backdrop-blur-[5px] drop-shadow-none hover:to-[100%] group cursor-pointer duration-300 `}
    >
      <div className="absolute right-0 w-[100px] h-[100px] border-t border-r border-gray group-hover:h-full group-hover:w-full duration-500" />
      <div className="absolute left-0 bottom-0 w-[100px] h-[100px] border-b border-l border-gray group-hover:h-full group-hover:w-full duration-500" />
      <div
        className={`w-full h-full left-0 bottom-0 group-hover:bottom-[15%] duration-300 drop-shadow-none p-4 flex flex-col justify-between`}
      >
        <Image 
          alt=""
          width={300}
          height={500}
          src={event.thumbnail}
          className=" object-fill h-[350px]"

        />
        {/* <p className={`font-normal text-[48px] text-foreground`}>
          {event.name}
        </p> */}
        <div className="flex flex-col justify-between gap-2">
          <p
            className="font-bold text-[24px] text-foreground"
            suppressHydrationWarning
          >
            {event.location}, {new Date(event.date).toLocaleDateString()}
          </p>
          <p
            className="font-bold text-[18px] text-foreground"
            suppressHydrationWarning
          >
            {new Date(event.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
