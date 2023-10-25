import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2 sm:col-span-1">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-10  flex-col sm:col-span-11">
          <h5>
            <Link href={`/${data.author?.id}`}>
              <div className="font-semibold">
              {data.author?.firstName} {data.author?.lastName}
              </div>
            </Link>
          </h5>
          <p className="py-2">{data.content}</p>
          <div className="flex flex-col sm:justify-center">
          {data.imageURL && (
            <Image  className="sm:py-2 sm:ml-10"src={data.imageURL} alt="image" width={400} height={400} />
          )}
          </div>
          <div className="flex justify-between text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
