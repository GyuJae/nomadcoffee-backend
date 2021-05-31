import { Resolvers, CoreOutput } from "../../type";
import protectedResolver from "../../utils/protectedResolver";

type UnfollowUserInput = {
  username: string;
};

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (
        _,
        { username }: UnfollowUserInput,
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
                disconnect: {
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
