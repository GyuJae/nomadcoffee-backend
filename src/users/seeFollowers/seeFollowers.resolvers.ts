import { User } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeFollowsInput = {
  username: string;
  page: number;
};

type SeeFollowsOutput = {
  ok: boolean;
  error?: string;
  followers?: User[];
  totalPages?: number;
};

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (
      _,
      { username, page }: SeeFollowsInput,
      { client }
    ): Promise<SeeFollowsOutput> => {
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
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: 5,
            skip: (page - 1) * 5,
          });
        const totalFollowers = await client.user.count({
          where: { followings: { some: { username } } },
        });
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 5),
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
