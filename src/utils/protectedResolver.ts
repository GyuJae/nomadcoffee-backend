import { Context, Resolver } from "../type";

export default (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      }
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
