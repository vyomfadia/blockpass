import React, {useEffect} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpeg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-3xl rounded-full p-6 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-4 w-4 right-4 top-4"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { isClicked, handleClick, screenSize, setActiveMenu, setScreenSize, currentColor } =
    useStateContext();


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    // whenever window resizes!, use that screen size in handleResize function
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SECTION doing something with that screensize
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          title="Notifications"
          dotColor="#03C907"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line size={30}/>}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img src={avatar} alt="user" className="rounded-full w-12 h-12 " />
            <p>
              <span className="text-gray-400 text-24">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-24">
                Anaïs
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-24" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
