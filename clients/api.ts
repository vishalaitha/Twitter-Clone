const isClient=typeof window !=='undefined'
import {GraphQLClient} from 'graphql-request'


export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string,{
    headers:()=>({
        Authorization:isClient
        ?`Bearer ${window.localStorage.getItem('__twitter_token')}`:"",
    })
});