import { PrismaClient, User } from "@prisma/client";

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

export type StringFieldUpdateOperationsInput = {
  set?: string;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null;
};

export type EditProfileInput = {
  email?: StringFieldUpdateOperationsInput | string;
  username?: StringFieldUpdateOperationsInput | string;
  name?: StringFieldUpdateOperationsInput | string;
  location?: StringFieldUpdateOperationsInput | string;
  avatarURL?: NullableStringFieldUpdateOperationsInput | string | null;
  githubUsername?: NullableStringFieldUpdateOperationsInput | string | null;
};

export type EditCoffeeShopInput = {
  shopId: number;
  name?: StringFieldUpdateOperationsInput | string;
  latitude?: StringFieldUpdateOperationsInput | string;
  longitude?: StringFieldUpdateOperationsInput | string;
};
