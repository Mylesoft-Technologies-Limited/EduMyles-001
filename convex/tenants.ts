import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get tenant by subdomain
 */
export const getTenantBySubdomain = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .filter((q) => q.eq(q.field("subdomain"), args.subdomain))
      .first();

    return tenant;
  },
});

/**
 * Get tenant by slug
 */
export const getTenantBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    return tenant;
  },
});

/**
 * Get tenant by ID
 */
export const getTenant = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const tenant = await ctx.db.get(args.tenantId);
    return tenant;
  },
});

/**
 * Create a new tenant
 */
export const createTenant = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    subdomain: v.string(),
    country: v.optional(v.string()),
    timezone: v.optional(v.string()),
    currency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if subdomain is already taken
    const existingTenant = await ctx.db
      .query("tenants")
      .filter((q) => q.eq(q.field("subdomain"), args.subdomain))
      .first();

    if (existingTenant) {
      throw new Error("Subdomain already taken");
    }

    const tenantId = await ctx.db.insert("tenants", {
      name: args.name,
      slug: args.slug,
      subdomain: args.subdomain,
      country: args.country || "KE",
      timezone: args.timezone || "Africa/Nairobi",
      currency: args.currency || "KES",
      status: "active",
      tier: "starter",
      maxUsers: 100,
      maxStudents: 1000,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(tenantId);
  },
});

/**
 * Update tenant
 */
export const updateTenant = mutation({
  args: {
    tenantId: v.id("tenants"),
    name: v.optional(v.string()),
    logo: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    secondaryColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { tenantId, ...updates } = args;

    await ctx.db.patch(tenantId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(tenantId);
  },
});

/**
 * Get all campuses for a tenant
 */
export const getTenantCampuses = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const campuses = await ctx.db
      .query("campuses")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();

    return campuses;
  },
});

/**
 * Create a campus
 */
export const createCampus = mutation({
  args: {
    tenantId: v.id("tenants"),
    name: v.string(),
    code: v.string(),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    principalName: v.optional(v.string()),
    registrationNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const campusId = await ctx.db.insert("campuses", {
      tenantId: args.tenantId,
      name: args.name,
      code: args.code,
      location: args.location,
      phone: args.phone,
      email: args.email,
      principalName: args.principalName,
      registrationNumber: args.registrationNumber,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(campusId);
  },
});

/**
 * Get campus by ID
 */
export const getCampus = query({
  args: { campusId: v.id("campuses") },
  handler: async (ctx, args) => {
    const campus = await ctx.db.get(args.campusId);
    return campus;
  },
});
