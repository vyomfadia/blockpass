import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

function NavigationBarButton({ text, onclick, page, cPage }: any) {
  console.log(cPage, page)
  return (
    <div onClick={onclick} className={" cursor-pointer " + (cPage == page && " pointer-events-none") }>
      <p className={"text-[18px] tracking-wide font-light uppercase hover:-translate-y-1 duration-200 opacity-70 hover:opacity-100 " + (cPage == page && " !opacity-100") }>
        {text}
      </p>
    </div>
  );
}

export default function NavigationBar({setPage, page}: {setPage: Dispatch<SetStateAction<number>>, page: number}) {
  return (
    <div className="flex justify-between w-full relative mx-auto py-4 px-20 items-center ">
      <NavigationBarButton text="Home" onclick={()=>{setPage(0)}} page={0} cPage={page}/>
      <NavigationBarButton text="Discover" onclick={()=>{setPage(1)}} page={1} cPage={page}/>
      <p className="text-[48px] font-extralight px-20 hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">BLOCKPASS</p>
      <NavigationBarButton text="Login" link="/" page={2} cPage={page}/>
      <NavigationBarButton text="Manage" link="/"  page={3} cPage={page}/>
    </div>
  );
}
