import Link from "next/link";

function NavigationBarButton({ text, link }: { text: string; link: string }) {
  return (
    <Link href={link}>
      <p className="text-[18px] tracking-wide font-light uppercase hover:-translate-y-1 duration-200 opacity-70 hover:opacity-100">
        {text}
      </p>
    </Link>
  );
}

export default function NavigationBar() {
  return (
    <div className="flex justify-between w-full relative mx-auto py-4 px-20 items-center mb-10">
      <NavigationBarButton text="Home" link="/"/>
      <NavigationBarButton text="Discover" link="/"/>
      <p className="text-[48px] font-extralight px-20 hover:drop-shadow-glow drop-shadow-none duration-200 cursor-default">BLOCKPASS</p>
      <NavigationBarButton text="Login" link="/"/>
      <NavigationBarButton text="Create" link="/"/>
    </div>
  );
}
