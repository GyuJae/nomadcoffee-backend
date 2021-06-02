import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editCoffeeShop(
      shopId: Int!
      name: String
      latitude: String
      longitude: String
    ): CoreOutput!
  }
`;
