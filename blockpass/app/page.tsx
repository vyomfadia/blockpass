import Image from "next/image";
import NavigationBar from "./(components)/NavigationBar";
import EventCard from "./(components)/EventCard";
import { Event } from "./types";
import DownChev from "./(assets)/down.svg";

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
      <NavigationBar />
        {/* <h1 className="text-[50px] my-12 mx-auto text-center font-bold">BLOCKPASS</h1> */}
        <div className="flex justify-between overflow-hidden mb-20 mx-auto">
          <div className="w-[200px] h-[300px] bg-primary" />
          <div className="w-[160px] h-[220px] bg-primary" />
          <div className="w-[250px] h-[160px] bg-primary" />
          <div className="w-[250px] h-[200px] bg-primary" />
          <div className="w-[250px] h-[160px] bg-primary" />
          <div className="w-[150px] h-[260px] bg-primary" />
        </div>

        <div className="py-5 group w-[30%] hover:w-[40%] duration-1000">
          <div className=" relative w-full h-[1px] bg-[#fff] ">
            <div className="w-[20px] h-[20px] left-full absolute bg-[#fff] rounded-full top-1/2  -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-[60%_40%] text-[48px] max-w-[1200px] mx-auto items-center">
          <div className="flex-col gap-4 flex">
            <h1 className="font-light leading-[120%] flex-wrap w-full flex gap-x-4">
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">Book</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">tickets</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">for</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">your</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">favourite</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">artists</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">with</span> 
              <span className="hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">security</span>
            </h1>
            <p className="font-extralight w-[80%] text-[16px]">
              Bla bla bla subtext. Bla bla bla subtext. Bla bla bla subtext. Bla
              bla bla subtext. Bla bla bla subtext.
            </p>
          </div>
          <div className="border-[1px] border-[#fffa] mx-auto rounded-full flex justify-center w-[256px] h-[256px] items-center group cursor-pointer hover:border-[#ffff] duration-200">
            <DownChev className="rotate-[270deg] opacity-70 group-hover:opacity-100 duration-200 " />
          </div>
        </div>
      </div>
    </main>
  );
}
