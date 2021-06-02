import { gql } from "apollo-server";

export default gql`
  type SeeCoffeeShopsOutput {
    ok: Boolean!
    error: String
    shops: [CoffeeShop]
  }

  type Query {
    seeCoffeeShops(page: Int!): SeeCoffeeShopsOutput!
  }
`;
