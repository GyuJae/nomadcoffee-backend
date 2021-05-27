import { Resolvers, User } from "../../type";

type SeeProfileInput = {
  username?: string;
};

type SeeProfileOutput = {
  ok: boolean;
  error?: string;
  user: User | undefined;
};

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (
      _,
      { username }: SeeProfileInput,
      { client }
    ): Promise<SeeProfileOutput> => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "Username is not exist",
            user: undefined,
          };
        }
        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          error,
          user: undefined,
        };
      }
    },
  },
};

export default resolvers;
