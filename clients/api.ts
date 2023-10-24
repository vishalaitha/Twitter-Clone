const isClient=typeof window !=='undefined'
import {GraphQLClient} from 'graphql-request'


export const graphqlClient = new GraphQLClient("http://localhost:8000/graphql",{
    headers:()=>({
        Authorization:isClient
        ?`Bearer ${window.localStorage.getItem('__twitter_token')}`:"",
    })
});