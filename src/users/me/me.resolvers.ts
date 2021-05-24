import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    me: (_, __, { client }) => {
      console.log(client);
      return "Hello";
    },
  },
};

export default resolvers;
