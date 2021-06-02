import { gql } from "apollo-server";

export default gql`
  type SeeCoffeeShopOutput {
    ok: Boolean!
    error: String
    shop: CoffeeShop
  }

  type Query {
    seeCoffeeShop(id: Int!): SeeCoffeeShopOutput!
  }
`;
