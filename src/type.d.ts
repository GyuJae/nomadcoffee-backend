import { PrismaClient } from ".prisma/client";

export type Context = {
  client: PrismaClient;
  loggedUser: User;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

export type CoreOutput = {
  ok: boolean;
  error?: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string | null;
  location: string | null;
  avatarURL: string | null;
  githubUsername: string | null;
};
