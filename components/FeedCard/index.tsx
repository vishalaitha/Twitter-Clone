import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-5 hover:bg-slate-900 transition-all  cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image className="rounded-full"
              src={data.author?.profileImageURL}
              height={50}
              width={50}
              alt={"imgnotefounadsc"}
            />
          )}
        </div>
        <div className="col-span-11 pl-2">
          <h5>
            {data.author?.firstName} {data.author?.lastName}
          </h5>
          <p>{data.content}</p>
          <div className="flex justify-between mt-5  text-xl items-center p-2 w-[90%]">
            <div className="">
              <BiMessageRounded />
            </div>
            <div className="">
              <AiOutlineRetweet />
            </div>
            <div className="">
              <AiOutlineHeart />
            </div>
            <div className="">
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
