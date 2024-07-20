import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

function NavigationBarButton({ text, onclick }: any) {
  return (
    <div onClick={onclick} className=" cursor-pointer">
      <p className="text-[18px] tracking-wide font-light uppercase hover:-translate-y-1 duration-200 opacity-70 hover:opacity-100">
        {text}
      </p>
    </div>
  );
}

export default function NavigationBar({setPage}: {setPage: Dispatch<SetStateAction<number>>}) {
  return (
    <div className="flex justify-between w-full relative mx-auto py-4 px-20 items-center ">
      <NavigationBarButton text="Home" onclick={()=>{setPage(0)}}/>
      <NavigationBarButton text="Discover" onclick={()=>{setPage(1)}}/>
      <p className="text-[48px] font-extralight px-20 hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">BLOCKPASS</p>
      <NavigationBarButton text="Login" link="/"/>
      <NavigationBarButton text="Create" link="/"/>
    </div>
  );
}
