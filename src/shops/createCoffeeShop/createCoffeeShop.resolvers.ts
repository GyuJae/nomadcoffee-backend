import { Resolvers, CoreOutput } from "../../type";
import getOrCreateCategory from "../../utils/getOrCreateCategory";
import protectedResolver from "../../utils/protectedResolver";

type CreateCoffeeShopInput = {
  name: string;
  latitude: string;
  longitude: string;
};

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        createCoffeeShopInput: CreateCoffeeShopInput,
        { client, loggedUser }
      ): Promise<CoreOutput> => {
        try {
          const category = await getOrCreateCategory(
            createCoffeeShopInput.name
          );
          await client.coffeeShop.create({
            data: {
              ...createCoffeeShopInput,
              user: {
                connect: {
                  id: loggedUser.id,
                },
              },
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
