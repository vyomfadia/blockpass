import Image from "next/image";
import NavigationBar from "./(components)/NavigationBar";
import EventCard from "./(components)/EventCard";
import { Event } from "./types";

const dummyEvent: Event = {
  name: "Vyoms Mom",
  description: "In the garden of life, she stands so tall A guiding light, the warmest call. Her heart's a haven, pure and kind, Still, she's a fortress in her mind. She's a warrior, a champion, a queen, She a hoe.",
  date: Date.now(),
  location: "Bedroom",
  thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmllbGR8ZW58MHx8MHx8fDA%3D"
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
      <NavigationBar />
      <h1 className=" cursor-default my-8 text-[32px]">Discover Events</h1>
      <div className="grid grid-cols-[1fr_1fr_1fr] w-full max-w-[800px] gap-4">
      <EventCard event={dummyEvent}  className="col-span-3" size="large"/>
      <EventCard event={dummyEvent}  className="col-span-2"/>
      <EventCard event={dummyEvent}  className=""/>
      </div>
    </main>
  );
}



