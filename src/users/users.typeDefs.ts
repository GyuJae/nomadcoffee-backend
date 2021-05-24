import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    name: String!
    email: String!
    createAt: String!
    updateAt: String!
  }
`;
