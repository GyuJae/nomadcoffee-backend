import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    password: String!
    name: String!
    location: String!
    avatarURL: String
    githubUsername: String
  }
`;
