import { Resolvers, CoreOutput, EditProfileInput } from "../../type";
import protectedResolver from "../../utils/protectedResolver";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        editProfileInput: EditProfileInput,
        { client, loggedUser }
      ): Promise<CoreOutput> => {
        try {
          const editdUser = await client.user.update({
            where: {
              id: loggedUser.id,
            },
            data: {
              ...editProfileInput,
            },
          });

          if (editdUser.id) {
            return {
              ok: true,
            };
          }
          return {
            ok: false,
            error: "Could not edit profile",
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
