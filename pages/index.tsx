import React, { useCallback, useState } from "react";
import Image from "next/image";
import { BiHash, BiHomeCircle, BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { PiBookmarkSimple } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { RiTwitterXLine, RiAccountPinCircleFill } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { Token } from "graphql";
import {} from "../graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

// import { VerifyUserGoogleTokenDocument } from "@/gql/graphql";

interface HomeProps{
  tweets?:Tweet[]
}

export default function Home(props:HomeProps) {
  const { user } = useCurrentUser();

  const { mutate } = useCreateTweet();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, []);

  return (
    <div>
      <TwitterLayout>
        <div>
          <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    height={50}
                    width={50}
                    alt={"imgnotefounadsc"}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className=" w-full bg-transparent cursor-text text-xl px-3 border-b border-slate-700"
                  rows={4}
                  placeholder="What is happening?!"
                ></textarea>
                <div className="mt-2 flex justify-between">
                  <AiOutlinePicture
                    onClick={handleSelectImage}
                    className="text-2xl "
                  />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1A8CD8] py-2 px-8 items-center font-semibold rounded-full  text-sm"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </div>
  );
}

export const getServerSideProps:GetServerSideProps<HomeProps>=async(context)=>{
  const allTweets=await graphqlClient.request(getAllTweetsQuery);
  return {
    props:{
      tweets:allTweets.getAllTweets as Tweet[]
    }
  }
}