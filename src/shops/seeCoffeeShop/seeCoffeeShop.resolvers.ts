import { CoffeeShop } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeCoffeeShopInput = {
  id: number;
};

type SeeCoffeeShopOutput = {
  ok: boolean;
  error?: string;
  shop?: CoffeeShop;
};

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop: async (
      _,
      { id }: SeeCoffeeShopInput,
      { client }
    ): Promise<SeeCoffeeShopOutput> => {
      try {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
        });
        if (!shop) {
          return {
            ok: false,
            error: "Shop do not exist",
          };
        }
        return {
          ok: true,
          shop,
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
