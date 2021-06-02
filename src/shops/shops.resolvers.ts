import { Resolvers } from "../type";

const resolvers: Resolvers = {
  CoffeeShop: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
  },
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categoryId: id,
        },
      }),
  },
};

export default resolvers;
