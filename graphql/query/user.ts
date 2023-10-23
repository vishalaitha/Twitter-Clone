import {graphql} from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
#graphql
query VerifyUserGoogleTokenQuery($token: String!){
    verifyGoogleToken(token:$token)
}
`);

export const getCurrentUserQuery=graphql(
    `
    query GetCurrentUser {
        getCurrentUser {
          id
          profileImageURL
          email
          firstName
          lastName
        }
      }

    `
);