import { gql } from "@apollo/client";

export const GET_MY_VEHICLES = gql`
  query GetMyVehicles($filter: VehicleFilterInput, $limit: Int!, $offset: Int!) {
    vehicles(filter: $filter, limit: $limit, offset: $offset) {
      totalCount
      hasNextPage
      items {
        id
        title
        year
        type
        price
        images
        rating
      }
    }
  }
`;