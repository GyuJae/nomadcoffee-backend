import { User } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeFollowingsInput = {
  username: string;
  lastId: number;
};

type SeeFollowingsOutput = {
  ok: boolean;
  error?: string;
  followings?: User[];
};

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (
      _,
      { username, lastId }: SeeFollowingsInput,
      { client }
    ): Promise<SeeFollowingsOutput> => {
      try {
        const ok = await await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "User not found ",
          };
        }
        const followings = await client.user
          .findUnique({
            where: { username },
          })
          .followings({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });

        return {
          ok: true,
          followings,
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
