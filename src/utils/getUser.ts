import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import client from "../client";

export default async (token: string): Promise<User | null> => {
  try {
    const verifiedToken: any = await jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    );
    if ("id" in verifiedToken) {
      const id = verifiedToken["id"];
      const user = await client.user.findUnique({ where: { id } });
      if (user) {
        return user;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
