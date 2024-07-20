import Image from "next/image";
import NavigationBar from "./(components)/NavigationBar";
import EventCard from "./(components)/EventCard";
import { Event } from "./types";

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
  return (
    <main className="h-[100dvh]">
      <div className="py-10">
        {/* <h1 className="text-[50px] my-12 mx-auto text-center font-bold">BLOCKPASS</h1> */}
        <div className="flex justify-between overflow-hidden mb-20 mx-auto">
          <div className="w-[200px] h-[300px] bg-primary" />
          <div className="w-[160px] h-[220px] bg-primary" />
          <div className="w-[250px] h-[160px] bg-primary" />
          <div className="w-[250px] h-[200px] bg-primary" />
          <div className="w-[250px] h-[160px] bg-primary" />
          <div className="w-[150px] h-[260px] bg-primary" />
        </div>

        <div className="grid grid-cols-[60%_40%] text-[48px] max-w-[1200px] mx-auto">
          <div className="flex-col gap-2 flex">
            <h1 className="font-light leading-[120%]">
              Book tickets for your favourite artists with security
            </h1>
            <p className="font-extralight w-[80%] text-[16px]">Bla bla bla subtext. Bla bla bla subtext. Bla bla bla subtext. Bla bla bla subtext. Bla bla bla subtext. </p>
          </div>
        </div>
      </div>

    </main>
  );
}
