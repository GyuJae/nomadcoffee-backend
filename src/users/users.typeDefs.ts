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
    followings: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    coffeeShops: [CoffeeShop]
  }
`;
