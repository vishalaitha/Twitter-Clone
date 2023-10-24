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
const UserProfilePage:NextPage<ServerProps>=(props)=>{
    // const {user} = useCurrentUser();
    const router=useRouter();
    // console.log(props);
    return(
        <div>
            <TwitterLayout>
                <div>
                    <nav className='flex items-center py-3 px-3'>
                        <BsArrowLeftShort className="text-4xl"/>
                        <div className='pl-5 '>
                            <h1 className='text-lg gap-4 font-bold'>Vishal Aitha</h1>
                            <h1 className='text-l gap-4 font-bold text-slate-500'>{props.userInfo?.tweets?.length} Tweets</h1>
                        </div>
                    </nav>
                    <div className='p-4 border-b border-slate-800'>
                        {props.userInfo?.profileImageURL&&
                        <Image
                        className='rounded-full'
                        src={props.userInfo?.profileImageURL} alt='profile-pic' width={100} height={100}
                    />}
                    <h1 className='text-lg gap-4 font-bold mt-5'>Vishal Aitha</h1>
                    </div>
                </div>
                <div>
                    {props.userInfo?.tweets?.map(tweet=><FeedCard data={tweet as Tweet} key={tweet?.id} />)}
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