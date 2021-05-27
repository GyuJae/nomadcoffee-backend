import { gql } from "apollo-server";

export default gql`
  type seeProfileOutput {
    ok: Boolean!
    error: String
    user: User
  }

  type Query {
    seeProfile(username: String): seeProfileOutput!
  }
`;
