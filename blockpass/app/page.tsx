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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  // const [page, setPage] = useState(0);

  const qp = useSearchParams();

  const [event, setEvent] = useState<Event | null>(null);
  const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useLayoutEffect(() => {
    if (scrollRef && !qp.has("discover"))
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    else if (scrollRef && qp.has("discover"))
      scrollRef.current?.scrollTo({
        left: scrollRef.current?.scrollWidth / 2,
        behavior: "smooth",
      });
  }, [scrollRef, qp]);

  return (
    <main className="py-7 h-full overflow-hidden">
      <NavigationBar />
      <div
        className="grid grid-cols-[100%_100%] overflow-hidden w-full h-full"
        ref={scrollRef}
      >
        {/* Landing */}
        <div className="h-full flex flex-col justify-end relative">
          <div className="absolute top-0 grid grid-cols-5 gap-8 overflow-hidden mt-5 h-full w-full">
            <div className=" grayscale">
              <Image width={300} height={250} src="/hero/1.jpg" alt="concert"/>
            </div>
            <div className=" grayscale-1 h-[320px] overflow-hidden">
              <Image width={300} height={250} src="/hero/2.jpg" alt="concert"/>
            </div>
            <div className="grayscale ">
              <Image width={300} height={250} src="/hero/3.jpg" alt="concert"/>
            </div>
            <div className="grayscale h-[350px] overflow-hidden">
              <Image width={300} height={250} src="/hero/5.jpg" alt="concert"/>
            </div>
            <div className=" grayscale">
              <Image width={300} height={250} src="/hero/4.jpg" alt="concert"/>
            </div>
          </div>

            <div className="pb-44">
            <div
              className={`py-5 group ease-in-out w-[30%] hover:w-[40%] duration-[2000ms] ${
                qp.has("discover") && " !w-[195%]"
              }`}
            >
              <div className=" relative w-full h-[1px] bg-gray ">
                <div className="w-[20px] h-[20px] left-full absolute   rounded-full top-1/2  -translate-y-1/2   bg-gray" />
              </div>
            </div>

              <div className="grid grid-cols-[60%_40%] max-w-[1200px] mx-auto items-center text-gray ">
                {/* Hero Text */}
                <div className="flex-col gap-4 flex self-end">
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
              <Link href="/?discover">
                <div className="border border-gray rounded-full grid place-items-center w-60 aspect-square items-center group cursor-pointer hover:border-[#ffff] duration-200 ml-auto">
                  <DownChev className="h-16 rotate-[180deg] opacity-30 group-hover:opacity-100 duration-200 " />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* events */}
        <div className="!text-gray">
          <h1 className="text-5xl font-black my-8 mx-20">
            Discover Events
          </h1>

          <div className="w-full py-4 mx-auto p-2 overflow-x-scroll no-scrollbar snap-x snap-mandatory pb-10 flex flex-col justify-center gradient-scroll">
            <div className="grid auto-cols-auto gap-8 grid-flow-col no-scrollbar overflow-auto whitespace-nowrap px-10 -mx-40">
              <div className="h-4 p-20"></div>
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
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full duration-500 py-7 ${
          event
            ? "pointer-events-auto backdrop-blur-sm opacity-100"
            : " backdrop-blur-0 pointer-events-none opacity-0"
        }`}
        onClick={() => setEvent(null)}
      >
        <div
          className={`relative duration-500 bg-[#2c2c2c] pointer-events-auto w-[500px] h-full ml-auto mr-7 rounded-lg shadow-2xl overflow-hidden ${
            event ? "translate-x-0" : " translate-x-[120%]"
          }`}
        >
          {/* <div className="flex flex-row-reverse text-2xl py-4 font-bold cursor-pointer">
            x
          </div> */}
          {event && (
            <div className=" justify-self-start">
              <Image
                alt=""
                width={300}
                height={200}
                src={event?.thumbnail}
                className="w-full object-contain "
              />
            </div>
          )}

          <div className="p-8 flex flex-col">
          <p className="text-3xl font-black pb-2">{event?.name}</p>
          <p className=" font-extralight pb-4">{event?.description}</p>
          <div className="flex flex-col justify-between gap-2 h-full">
            <p className="font-bold text-xl text-foreground">Location</p>
            <p
              className="font-ultralight text-foreground pb-2"
              suppressHydrationWarning
            >
              {dummyEvent.location}
            </p>
            <p className="font-bold text-xl text-foreground">
              Date and Time
            </p>
            <p
              className="font-ultralight text-foreground"
              suppressHydrationWarning
            >
              {new Date(dummyEvent.date).toLocaleDateString()}
              {", "}
              {new Date(dummyEvent.date).toLocaleTimeString()}
            </p>
            <button className="bg-primary absolute mx-auto left-[50%] -translate-x-2/4 bottom-5 w-[90%] py-3 mt-auto rounded-md justify-self-end">Purchase</button>
          </div>
          </div>

        </div>
      </div>
    </main>
  );
}
