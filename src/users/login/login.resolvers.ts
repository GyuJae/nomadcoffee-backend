import { Resolvers } from "../../type";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type LoginInput = {
  username: string;
  password: string;
};

type LoginOutput = {
  ok: boolean;
  error?: string;
  token?: string;
};

const resolvers: Resolvers = {
  Mutation: {
    login: async (
      _,
      { username, password }: LoginInput,
      { client }
    ): Promise<LoginOutput> => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const passwordOk = await bcrypt.compare(user.password, password);
        if (passwordOk) {
          return {
            ok: false,
            error: "Incorrect Password",
          };
        }
        const token = jwt.sign(
          { id: user.id },
          process.env.PRIVATE_KEY as string
        );
        return {
          ok: true,
          token,
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
