import { Resolvers, CoreOutput } from "../../type";
import * as bcrypt from "bcrypt";

type CreateAccountInput = {
  email: string;
  username: string;
  password: string;
  name: string;
  location: string;
  avatarURL?: string;
  githubUsername?: string;
};

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      createAccountInput: CreateAccountInput,
      { client }
    ): Promise<CoreOutput> => {
      try {
        const { username, email, password } = createAccountInput;
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "Username or Email already exist",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: { ...createAccountInput, password: uglyPassword },
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
    },
  },
};

export default resolvers;
