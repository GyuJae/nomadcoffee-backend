import { Category } from ".prisma/client";
import { Resolvers } from "../../type";

type SeeCategoriesInput = {
  page: number;
};

type SeeCategoriesOutput = {
  ok: boolean;
  error?: string;
  categories?: Category[];
};

const resolvers: Resolvers = {
  Query: {
    seeCategories: async (
      _,
      { page }: SeeCategoriesInput,
      { client }
    ): Promise<SeeCategoriesOutput> => {
      try {
        const categories = await client.category.findMany({
          take: 10,
          skip: (page - 1) * 10,
        });
        return {
          ok: true,
          categories,
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
