import { Resolvers, CoreOutput } from "../../type";
import protectedResolver from "../../utils/protectedResolver";

type FollowUserInput = {
  username: string;
};

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (
        _,
        { username }: FollowUserInput,
        { client, loggedUser }
      ): Promise<CoreOutput> => {
        try {
          const ok = await client.user.findUnique({
            where: {
              username,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            return {
              ok: false,
              error: "That user does not exist",
            };
          }
          await client.user.update({
            where: {
              id: loggedUser.id,
            },
            data: {
              followings: {
                connect: {
                  username,
                },
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error,
          };
        }
      }
    ),
  },
};

export default resolvers;
