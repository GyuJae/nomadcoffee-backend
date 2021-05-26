import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      email: String!
      username: String!
      password: String!
      name: String!
      location: String!
      avatarURL: String
      githubUsername: String
    ): CoreOutput!
  }
`;
