import { Resolvers } from "../type";

const resolvers: Resolvers = {
  User: {
    totalFollowing: async (root) => {
      return root.followings.length;
    },
    totalFollowers: async (root) => {
      return root.followers.length;
    },
    isMe: async ({ id }, _, { loggedUser }) => {
      if (!loggedUser) {
        return false;
      }
      return id === loggedUser.id;
    },
    isFollowing: async ({ id }, _, { loggedUser, client }) => {
      if (!loggedUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedUser.username,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    coffeeShops: async ({ id }, _, { client }) => {
      const shops = await client.coffeeShop.findMany({
        where: {
          userId: id,
        },
      });
      return shops;
    },
  },
};

export default resolvers;
