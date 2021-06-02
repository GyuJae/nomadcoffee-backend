import { gql } from "apollo-server";

export default gql`
  type SeeCategoryOutput {
    ok: Boolean!
    error: String
    category: Category
  }

  type Query {
    seeCategory(shopId: Int!): SeeCategoryOutput!
  }
`;
