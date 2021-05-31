import { gql } from "apollo-server-core";

export default gql`
  type SearchUserOutput {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    searchUser(keyword: String!): SearchUserOutput!
  }
`;
