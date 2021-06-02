import { CoreOutput, Resolvers, EditCoffeeShopInput } from "../../type";
import getOrCreateCategory from "../../utils/getOrCreateCategory";
import protectedResolver from "../../utils/protectedResolver";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { shopId, ...editCoffeeShopInput }: EditCoffeeShopInput,
        { client, loggedUser }
      ): Promise<CoreOutput> => {
        try {
          const ok = await client.coffeeShop.findUnique({
            where: {
              id: shopId,
            },
            select: {
              id: true,
              userId: true,
              category: true,
            },
          });
          if (!ok?.id) {
            return {
              ok: false,
              error: "CoffeeShop not exists",
            };
          }
          if (ok?.userId !== loggedUser.id) {
            return {
              ok: false,
              error: "No Authority",
            };
          }
          const category = await getOrCreateCategory(
            editCoffeeShopInput.name as string
          );
          await client.coffeeShop.update({
            where: {
              id: shopId,
            },
            data: {
              ...editCoffeeShopInput,
              category: {
                connect: {
                  id: category.id,
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
