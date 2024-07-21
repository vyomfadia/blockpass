"use client";

import Image from "next/image";
import { Event } from "../types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOnScreen } from "../(hooks)/IsOnScreen";

export default function EventCard({
  className,
  event,
  setEvent,
}: {
  className?: string;
  event: any;
  setEvent?: Dispatch<SetStateAction<Event | null>>;
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (!loaded && isOnScreen) {
      setLoaded(true);
    }
  }, [isOnScreen, loaded]);


  
  console.log(event)

  return (
    <div
      ref={ref}
      onClick={() => setEvent(event)}
      className={` ${className} w-[380px] snap-start bg-[#000] h-[500px] overflow-hidden relative backdrop-blur-[10px] drop-shadow-botom hover:to-[100%] group cursor-pointer duration-300 rounded-lg`}
    >
      {/* <div className="absolute right-0 w-[100px] h-[100px] border-t border-r border-gray group-hover:h-full group-hover:w-full duration-500" />
      <div className="absolute left-0 bottom-0 w-[100px] h-[100px] border-b border-l border-gray group-hover:h-full group-hover:w-full duration-500" /> */}
      <div
        className={`relative w-full h-full left-0 bottom-0 duration-300 drop-shadow-none flex flex-col justify-between`}
      >
        <div className="overlay absolute w-full h-full overflow-hidden">
          <svg
            height="100%"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="9.11"
                numOctaves="6"
                stitchTiles="stitch"
              />
            </filter>

            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        <div className="card-gradient h-full relative">
            <Image
              alt=""
              width={300}
              height={300}
              src={event.eventThumbnail}
              className="w-full object-cover h-full absolute opacity-[20%]"
            />
          <div className="h-full flex flex-col p-4 justify-end">
            <p className="mt-auto font-black text-3xl z-20">{event.name}</p>
          </div>
        </div>
        <div className="flex justify-between gap-2 p-4 py-8">
          <div className="flex flex-col gap-2">
            <p
              className="text-md font-bold text-[24px"
              suppressHydrationWarning
            >
              {event.location}
            </p>
            <p className="text-lg">
              {new Date(Number(event.date)).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col justify-end items-end gap-2">
            <p className="font-bold text-sm">Starting at</p>
            <p className="text-lg" suppressHydrationWarning>
              {new Date(Number(event.date)).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
