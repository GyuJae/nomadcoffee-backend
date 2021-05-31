import { User } from ".prisma/client";
import { Resolvers } from "../../type";

type SearchUserInput = {
  keyword: string;
};

type SearchUserOutput = {
  ok: boolean;
  error?: string;
  users?: User[];
};

const resolvers: Resolvers = {
  Query: {
    searchUser: async (
      _,
      { keyword }: SearchUserInput,
      { client }
    ): Promise<SearchUserOutput> => {
      try {
        const users = await client.user.findMany({
          where: {
            username: {
              startsWith: keyword.toLowerCase(),
            },
          },
        });
        return {
          ok: true,
          users,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};

export default resolvers;
