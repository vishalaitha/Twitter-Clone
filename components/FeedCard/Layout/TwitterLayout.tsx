import { useRouter } from "next/router";
import { Tweet } from "@/gql/graphql";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { RiAccountPinCircleFill, RiTwitterXLine } from "react-icons/ri";
import FeedCard from "..";
import { BiSearch } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { FiMail } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiBookmarkSimple } from "react-icons/pi";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface TwitterlayoutProps {
  children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <GoHomeFill />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiSearch />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <IoNotificationsOutline />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <FiMail />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <PiBookmarkSimple />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <RiTwitterXLine />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <RiAccountPinCircleFill />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/",
      },
    ],
    [user?.id]
  );

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
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <RiTwitterXLine />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <RiTwitterXLine />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user?.firstName} {user?.lastName}
                </h3>
                <h3 className="text-xl">
                  {"@"}
                  {user?.email.slice(0, -10)}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          {props.children}
        </div>

        <div className="col-span-0 sm:col-span-3 p-5">
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
};
export default TwitterLayout;