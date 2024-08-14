"use client";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Logo from "@/public/logo.svg";
import Login from "../wallet/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function NavigationBarButton({ text, link }: any) {
  const pathName = usePathname();
  const qp = useSearchParams();
  
  const [isSet, setSet] = useState(
    (link == pathName && !qp.has("discover")) ||
    (link == "/?discover" && qp.has("discover"))
  );
  
  useEffect(() => {
    setSet(
      (link == pathName && !qp.has("discover")) ||
      (link == "/?discover" && qp.has("discover"))
    );
  }, [pathName, qp]);
      
  return (
    <Link href={link} className={" cursor-pointer "}>
      <p
        className={
          "text-[18px] tracking-wide font-extralight  uppercase hover:-translate-y-1 duration-200 hover:opacity-100 " +
          (isSet ? " opacity-100" : " opacity-70")
        }
        >
        {text}
      </p>
    </Link>
  );
}

export default function NavigationBar() {
  return (
    <div className="flex justify-between w-full relative mx-auto pb-8 px-20 items-center ">
      <NavigationBarButton text="Home" link="/" />
      <NavigationBarButton text="Discover" link="/?discover" />
      <div className="h-[80px]">
        <Logo />
      </div>
      <NavigationBarButton text="Wallet" link="/wallet" />
      <NavigationBarButton text="Manage" link="https://a02c-62-23-207-10.ngrok-free.app" />
    </div>
  );
}
