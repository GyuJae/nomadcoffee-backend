import { gql } from "apollo-server";

export default gql`
  type LoginOutput {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginOutput!
  }
`;
