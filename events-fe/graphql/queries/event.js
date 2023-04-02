import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query {
    events {
      data {
        id
        attributes {
          name
          venue
          address
          date
          time
          performers
          description
          user{
            data{
              attributes{
                username
              }
            }
          }
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
