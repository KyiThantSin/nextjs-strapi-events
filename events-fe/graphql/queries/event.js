import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query {
    events {
      data {
        id
        attributes {
          name
          slug
          venue
          address
          date
          time
          performers
          description
          url {
            data {
              id
              attributes{
                    url
              }
            }
          }
        }
      }
    }
  }
`;
