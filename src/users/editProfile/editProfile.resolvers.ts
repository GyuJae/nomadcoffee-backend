import { Resolvers, CoreOutput } from "../../type";
import protectedResolver from "../../utils/protectedResolver";
import * as bcrypt from "bcrypt";

type EditProfileInput = {
  email?: string;
  username?: string;
  password?: string;
  name?: string;
  location?: string;
  avatarURL?: string;
  githubUsername?: string;
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        editProfileInput: EditProfileInput,
        { client, loggedUser }
      ): Promise<CoreOutput> => {
        try {
          const { password: newPassword } = editProfileInput;
          let uglyPassword = null;
          if (newPassword) {
            uglyPassword = bcrypt.hash(newPassword, 10);
          }
          const editdUser = await client.user.update({
            where: {
              id: loggedUser.id,
            },
            data: {
              ...editProfileInput,
              ...(uglyPassword && { password: uglyPassword }),
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
