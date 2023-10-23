import React, { useCallback } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { PiBookmarkSimple } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { RiTwitterXLine, RiAccountPinCircleFill } from "react-icons/ri";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { Token } from "graphql";
import {} from "../graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { VerifyUserGoogleTokenDocument } from "@/gql/graphql";
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
    title: "Explore",
    icon: <BiSearch />,
  },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <FiMail />,
  },
  {
    title: "Bookmarks",
    icon: <PiBookmarkSimple />,
  },
  {
    title: "Twitter Blue",
    icon: <RiTwitterXLine />,
  },
  {
    title: "Profile",
    icon: <RiAccountPinCircleFill />,
  },
  {
    title: "More",
    icon: <CgMoreO />,
  },
];
export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  console.log(user);
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        return toast.error(`Google token not found`);
      }

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen  px-40 ">
        <div className="col-span-3  justify-start pt-8 relative">
          <div className="text-4xl h-fit hover:bg-gray-800 rounded-full cursor-pointer px-5 transition-all w-fit">
            <RiTwitterXLine />
          </div>
          <div className="mt-4 text-2xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-4"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 px-3">
              <button className="bg-[#1A8CD8] py-4 px-2 font-semibold rounded-full  text-lg  w-full">
                Tweet
              </button>
            </div>
          </div>
          {
            user&&(
              <div className="absolute bottom-10 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
            {user && user.profileImageURL && (
              <Image
              className="rounded-full"
                src={user?.profileImageURL}
                alt="user-profilepic"
                height={50}
                width={50}
              />
            )}
            <div>
            <h3 className="text-xl">{user?.firstName} {user?.lastName}</h3>
            <h3 className="text-xl">{user?.email.slice(0,-10  )}</h3>
            </div>
          </div>
            )
          }
        </div>

        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-auto scrollbar-hide border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>

        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="text-2xl my-2">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
