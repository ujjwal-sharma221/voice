import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "INVALID_SESSION",
        message: "The contact session has expired.",
      });
    }

    const threadId = "123";

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId: args.organizationId,
      threadId,
    });

    return conversationId;
  },
});

export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "INVALID_SESSION",
        message: "The contact session has expired.",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;

    return {
      id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});
