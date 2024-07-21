"use client";

import Image from "next/image";
import NavigationBar from "./(components)/NavigationBar";
import EventCard from "./(components)/EventCard";
import { Event } from "./types";
import DownChev from "./(assets)/down.svg";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const dummyEvent: Event = {
  name: "Vyoms Mom",
  description:
    "In the garden of life, she stands so tall A guiding light, the warmest call. Her heart's a haven, pure and kind, Still, she's a fortress in her mind. She's a warrior, a champion, a queen, She a hoe.",
  date: Date.now(),
  location: "Bedroom",
  thumbnail:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmllbGR8ZW58MHx8MHx8fDA%3D",
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [event, setEvent] = useState<Event | null>(null);
  const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useLayoutEffect(() => {
    console.log(scrollRef.current?.scrollWidth);
    if (scrollRef && page == 0)
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    else if (scrollRef && page == 1)
      scrollRef.current?.scrollTo({
        left: scrollRef.current?.scrollWidth / 2,
        behavior: "smooth",
      });
  }, [page, scrollRef]);

  return (
    <main className="py-7 h-full overflow-hidden">
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full duration-500 py-7 ${
          event
            ? "pointer-events-auto backdrop-blur-sm opacity-100"
            : " backdrop-blur-0 pointer-events-none opacity-0"
        }`}
        onClick={() => setEvent(null)}
      >
        <div
          className={` duration-500 bg-[#2c2c2c] pointer-events-auto w-[500px] h-full ml-auto mr-7 rounded-3xl shadow-2xl p-10 text-[24px] flex flex-col gap-5 ${
            event ? "translate-x-0" : " translate-x-[120%]"
          }`}
        >
          {event && <Image
            alt=""
            width={300}
            height={500}
            src={event?.thumbnail}
            className=" w-full object-contain rounded-xl h-[500px]"
          />}
          <p>{event?.name}</p>
          <p className=" font-extralight text-[12px]">{event?.description}</p>
          <div className="flex flex-col justify-between gap-2">
            <p className="font-bold text-[24px] text-foreground">Location</p>
            <p
              className="font-medium -mt-2 text-[18px] text-foreground"
              suppressHydrationWarning
            >
              {dummyEvent.location}
            </p>
            <p className="font-bold text-[24px] text-foreground">
              Date and Time
            </p>
            <p
              className="font-medium text-[18px] text-foreground"
              suppressHydrationWarning
            >
              {new Date(dummyEvent.date).toLocaleDateString()}{", "}
              {new Date(dummyEvent.date).toLocaleTimeString()}
            </p>
            <button className="bg-primary mt-auto">Purchase</button>
          </div>
        </div>
      </div>
      <NavigationBar setPage={setPage} page={page} />
      <div
        className="grid grid-cols-[100%_100%] overflow-hidden w-full h-full"
        ref={scrollRef}
      >
        <div className="h-full flex flex-col justify-end relative">
          <div className="absolute top-0 grid grid-cols-5 gap-8 overflow-hidden mt-5 h-full w-full">
            <div className="h-[300px] bg-primary" />
            <div className="h-[220px] bg-primary" />
            <div className="h-[160px] bg-primary" />
            <div className="h-[200px] bg-primary" />
            <div className="h-[160px] bg-primary" />
          </div>

            <div className="pb-32">
            <div
                className={`py-5 group ease-in-out w-[30%] hover:w-[40%] duration-[2000ms] ${
                  page == 1 && " !w-[195%]"
                }`}
              >
                <div className=" relative w-full h-[1px] bg-gray ">
                  <div className="w-[20px] h-[20px] left-full absolute   rounded-full top-1/2  -translate-y-1/2   bg-gray" />
                </div>
              </div>

              <div className="grid grid-cols-[60%_40%] max-w-[1200px] mx-auto items-center text-gray ">
                {/* Hero Text */}
                <div className="flex-col gap-4 flex">
                  {/* Hero Title */}
                  <h1 className="font-semibold text-5xl">
                      Book tickets for your favourite artists with security
                  </h1>
                  {/* Subheading */}
                  <p className="font-extralight w-[80%]">
                    Bla bla bla subtext. Bla bla bla subtext. Bla bla bla subtext.
                    Bla bla bla subtext. Bla bla bla subtext.{" "}
                  </p>
                </div>

                {/* Next button */}
                <div className="border border-gray rounded-full grid place-items-center w-60 aspect-square items-center group cursor-pointer hover:border-[#ffff] duration-200 ml-auto" onClick={()=>setPage(1)}>
                  <DownChev className="h-16 rotate-[180deg] opacity-30 group-hover:opacity-100 duration-200 " />
                </div>

              </div>
            </div>
        </div>
        <div>
          <h1 className="text-[12px] font-light mx-auto mb-2 -mt-5 text-center">
            Discover Events
          </h1>

          <div className="max-w-[1300px] py-4 mx-auto p-2 overflow-x-scroll snap-x snap-mandatory pb-10">
            <div className="w-full grid auto-cols-auto gap-[45px] grid-flow-col">
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
              <EventCard setEvent={setEvent} event={dummyEvent} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
