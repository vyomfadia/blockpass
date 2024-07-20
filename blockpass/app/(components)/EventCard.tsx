import Image from "next/image";
import { Event } from "../types";

export default function EventCard({
  className,
  event,
}: {
  className?: string;
  event: Event;
}) {
  return (
    <div
      className={` ${className} w-full h-full rounded-[5px] relative overflow-hidden hover:to-[100%] cursor-pointer group`}
    >
      <div className="w-full absolute left-0 top-0 bg-gradient-to-t h-full from-[#000] to-slate-[#000]/0 to-[100%] group-hover:opacity-100 opacity-0 duration-200"/>
      <div className="w-full absolute left-0 bottom-0 p-8 group-hover:bottom-1/4 duration-200">
          <p className="font-normal text-[48px] text-foreground">
            {event.name}
          </p>
        <div className="flex justify-between">
          <p className="font-light text-[36px] text-foreground">
            {event.location}, {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="font-light text-[36px] text-foreground">
            {new Date(event.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <Image
        width={806}
        height={453}
        alt={event.name}
        src={event.thumbnail}
        className=" w-full h-auto"
      />
    </div>
  );
}
