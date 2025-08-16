import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
  }),

  contactSession: defineTable({
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    expiresAt: v.number(),
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
  })
    .index("by_expires_at", ["expiresAt"])
    .index("by_organization_id", ["organizationId"]),

  conversations: defineTable({
    threadId: v.string(),
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved"),
    ),
  })
    .index("by_organization_id", ["organizationId"])
    .index("by_contact_session_id", ["contactSessionId"])
    .index("thread_id", ["threadId"])
    .index("by_status_and_organization_id", ["organizationId", "status"]),
});
