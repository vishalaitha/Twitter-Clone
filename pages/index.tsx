import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle,BiSearch } from "react-icons/bi";
import {GoHomeFill} from "react-icons/go"
import {IoNotificationsOutline} from "react-icons/io5"
import {FiMail} from "react-icons/fi"
import {PiBookmarkSimple} from "react-icons/pi"
import {CgMoreO} from "react-icons/cg"
import {RiTwitterXLine,RiAccountPinCircleFill} from "react-icons/ri"
import FeedCard from "@/components/FeedCard";
const inter = Inter({ subsets: ["latin"] });
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title:"Explore",
    icon:<BiSearch/>
  },
  {
    title:"Notifications",
    icon:<IoNotificationsOutline/>
  },
  {
    title:"Messages",
    icon:<FiMail/>
  },
  {
    title:"Bookmarks",
    icon:<PiBookmarkSimple/>
  },
  {
    title:"Profile",
    icon:<RiAccountPinCircleFill/>
  }
];
export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen  px-56">
        <div className="col-span-3 justify-start pt-8 px-4 ">
          <div className="text-4xl h-fit hover:bg-gray-800 rounded-full cursor-pointer px-5 transition-all w-fit">
            <BsTwitter />
          </div>
          <div className="mt-4 text-2xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-6" key={item.title}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>

                <div className="mt-5 px-3">
                  <button className="bg-[#1A8CD8] p-4 font-semibold rounded-full  text-lg  w-full">Tweet</button>
                </div>

          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] text-lg border-grey">

                <FeedCard/>

        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
