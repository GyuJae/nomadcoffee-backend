import { gql } from "apollo-server";

export default gql`
  type CoreOutput {
    ok: Boolean!
    error: String
  }
`;
