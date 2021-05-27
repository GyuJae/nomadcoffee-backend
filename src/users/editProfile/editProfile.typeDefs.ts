import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      email: String
      username: String
      password: String
      name: String
      location: String
      avatarURL: String
      githubUsername: String
    ): CoreOutput!
  }
`;
