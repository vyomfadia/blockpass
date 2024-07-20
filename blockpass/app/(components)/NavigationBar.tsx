import Link from "next/link";

function NavigationBarButton({ text, link }: { text: string; link: string }) {
  return (
    <Link href={link}>
      <p className="text-[18px] tracking-wide hover:-translate-y-1 duration-200 opacity-70 hover:opacity-100">
        {text}
      </p>
    </Link>
  );
}

export default function NavigationBar() {
  return (
    <div className="flex gap-16 w-full max-w-[1040px] relative mx-auto py-4 items-center mb-8">
      <Link className="" href={"/"}>
        <span className="text-foreground text-[24px] flex items-center justify-center">
          BLOCKPASS
        </span>
      </Link>
      <div className="grid grid-cols-[1fr_1fr_1fr] max-w-[600px] items-center">
        <NavigationBarButton text="Home" link="/" />
        <NavigationBarButton text="Events" link="/events" />
        <NavigationBarButton text="My Tickets" link="/tickets" />
      </div>
      <div className="w-[40px] h-[40px] bg-[#fff] rounded-full ml-auto" />
    </div>
  );
}
