require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { Context, User } from "./type";
import client from "./client";
import getUser from "./utils/getUser";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        client,
        loggedUser: await getUser(ctx.req.headers.token as string),
      };
    }
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/ ✅`));
