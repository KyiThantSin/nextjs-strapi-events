import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation (
    $name: String!
    $slug: String
    $venue: String!
    $address: String!
    $date: Date
    $time: String
    $performers: String!
    $description: String
    $url: ID
  ) {
    createEvent(
      data: {
        name: $name
        slug: $slug
        venue: $venue
        address: $address
        date: $date
        time: $time
        performers: $performers
        description: $description
        url: $url
      }
    ) {
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
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation (
    $id: ID!
    $name: String!
    $slug: String
    $venue: String!
    $address: String!
    $date: Date
    $time: String
    $performers: String!
    $description: String
    $url: ID
  ) {
    updateEvent(
      id: $id
      data: {
        name: $name
        slug: $slug
        venue: $venue
        address: $address
        date: $date
        time: $time
        performers: $performers
        description: $description
        url: $url
      }
    ) {
      data {
        id
      }
    }
  }
`;
