import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contactSession"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.contactSessionId);
  },
});
