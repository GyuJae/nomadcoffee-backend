import { CoffeeShop } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeCoffeeShopsInput = {
  page: number;
};

type SeeCoffeeShopsOutput = {
  ok: boolean;
  error?: string;
  shops?: CoffeeShop[];
};

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (
      _,
      { page }: SeeCoffeeShopsInput,
      { client }
    ): Promise<SeeCoffeeShopsOutput> => {
      try {
        const shops = await client.coffeeShop.findMany({
          take: 10,
          skip: (page - 1) * 10,
        });
        return {
          ok: true,
          shops,
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
