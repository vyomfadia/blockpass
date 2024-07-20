import Image from "next/image";
import NavigationBar from "./(components)/NavigationBar";
import EventCard from "./(components)/EventCard";
import { Event } from "./types";

const dummyEvent: Event = {
  name: "Vyoms Mom",
  description: "Vyoms mom is a very nice person",
  date: Date.now(),
  location: "Bedroom",
  thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmllbGR8ZW58MHx8MHx8fDA%3D"
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <NavigationBar />
      <div className="grid grid-cols-[1fr_1fr_1fr] w-full max-w-[1040px]">
        <EventCard event={dummyEvent}  className="col-span-3"/>
      </div>
    </main>
  );
}



