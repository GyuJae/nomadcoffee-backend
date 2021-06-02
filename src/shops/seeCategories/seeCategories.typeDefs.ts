import { gql } from "apollo-server";

export default gql`
  type SeeCategoriesOutput {
    ok: Boolean!
    error: String
    categories: [Category]
  }

  type Query {
    seeCategories(page: Int!): SeeCategoriesOutput!
  }
`;
