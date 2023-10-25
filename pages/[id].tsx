// import { graphqlClient } from '@/clients/api';
// import FeedCard from '@/components/FeedCard';
// import TwitterLayout from '@/components/FeedCard/Layout/TwitterLayout';
// import { Tweet } from '@/gql/graphql';
// import { getUserByIdQuery } from '@/graphql/query/user';
// import { useCurrentUser } from '@/hooks/user';
// import type {GetServerSideProps, NextPage} from 'next';
// import Image from 'next/image'
// import {BsArrowLeftShort} from 'react-icons/bs'
import { useRouter } from "next/router";
import Twitterlayout from "@/components/FeedCard/Layout/TwitterLayout";
import Image from "next/image";
import type { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
// import {
//   followUserMutation,
//   unfollowUserMutation,
// } from "@/graphql/mutation/user";
interface ServerProps {
  userInfo?: User;
}
import { useQueryClient } from "@tanstack/react-query";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { userInfo } from "os";
import { followUserMutation,unfollowUserMutation } from "@/graphql/mutation/user";
const UserProfilePage: NextPage<ServerProps> = (props) => {
  const { user: currentUser } = useCurrentUser();
  const router = useRouter();
  const queryClient=useQueryClient();
  const amIFollowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (currentUser?.following?.findIndex(
        (el) => el?.id === props.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, props.userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(followUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(unfollowUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  // console.log(props);
  return (
    <div>
      <TwitterLayout>
        <div className="">
          <nav className="flex items-center py-3 px-3">
            <BsArrowLeftShort className="text-4xl" />
            <div className="pl-5 ">
              <h1 className="text-lg gap-4 font-bold">
                {props.userInfo?.firstName} {props.userInfo?.lastName}
              </h1>
              <h1 className="text-l gap-4 font-bold text-slate-500">
                {props.userInfo?.tweets?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {props.userInfo?.profileImageURL && (
              <Image
                className="mx-3 rounded-full"
                src={props.userInfo?.profileImageURL}
                alt="profile-pic"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-lg mx-5 gap-4 font-bold mt-5">
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 mx-5 text-sm text-gray-400">
                <span>{props.userInfo?.followers?.length} followers</span>
                <span>{props.userInfo?.following?.length} following</span>
              </div>
              {currentUser?.id !== props.userInfo?.id && (
                <>
                  {amIFollowing ? (
                    <button onClick={handleUnfollowUser} className=" rounded-full mx-7 px-10 bg-[#1d9bf0] outline-black py-2">
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollowUser} className=" rounded-full mx-7 px-10 bg-[#1d9bf0] outline-black py-2">
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          {props.userInfo?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;

  if (!id) return { notFound: true, props: { userInfo: undefined } };

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
};

export default UserProfilePage;
