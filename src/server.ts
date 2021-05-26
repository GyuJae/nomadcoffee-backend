require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import client from "./client";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    return {
      client,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/ ✅`));
