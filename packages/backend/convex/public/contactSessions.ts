import { v } from "convex/values";
import { mutation } from "../_generated/server";

const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.string()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        viewPortSize: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.string()),
        cookieEnabled: v.optional(v.boolean()),
        referer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      }),
    ),
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION_MS;

    const contactSessionId = await ctx.db.insert("contactSession", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      metadata: args.metadata,
      expiresAt,
    });

    return contactSessionId;
  },
});

export const validate = mutation({
  args: {
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession) {
      return { valid: false, cause: "Contact session not found" };
    }

    if (contactSession.expiresAt < Date.now()) {
      return { valid: false, cause: "Contact session expired" };
    }

    return { valid: true, contactSession };
  },
});
