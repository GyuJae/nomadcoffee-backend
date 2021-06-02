import { Category } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeCategoryInput = {
  shopId: number;
};

type SeeCategoryOutput = {
  ok: boolean;
  error?: string;
  category?: Category;
};

const resolvers: Resolvers = {
  Query: {
    seeCategory: async (
      _,
      { shopId }: SeeCategoryInput,
      { client }
    ): Promise<SeeCategoryOutput> => {
      try {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id: shopId,
          },
        });
        if (!shopId) {
          return {
            ok: false,
            error: "Shop do not exists",
          };
        }
        const category = await client.category.findUnique({
          where: {
            id: shop?.categoryId,
          },
        });
        if (!category) {
          return {
            ok: false,
            error: "Categoru do not exists",
          };
        }
        return {
          ok: true,
          category,
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
