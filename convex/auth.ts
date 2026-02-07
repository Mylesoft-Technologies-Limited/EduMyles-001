import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get current user from WorkOS authentication
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // Get user from database
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("workosId"), identity.subject))
      .first();

    return user;
  },
});

/**
 * Get user by ID
 */
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

/**
 * Create or update user on first login
 */
export const upsertUser = mutation({
  args: {
    workosId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("workosId"), args.workosId))
      .first();

    if (existingUser) {
      // Update last signed in
      await ctx.db.patch(existingUser._id, {
        lastSignedIn: Date.now(),
      });
      return existingUser;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      tenantId: args.tenantId,
      workosId: args.workosId,
      email: args.email,
      name: args.name,
      role: "user",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastSignedIn: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

/**
 * Get user's roles for a tenant
 */
export const getUserRoles = query({
  args: { userId: v.id("users"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const userRoles = await ctx.db
      .query("userRoles")
      .filter((q) => q.and(q.eq(q.field("userId"), args.userId), q.eq(q.field("tenantId"), args.tenantId)))
      .collect();

    const roles = [];
    for (const userRole of userRoles) {
      const role = await ctx.db.get(userRole.roleId);
      if (role) {
        roles.push(role);
      }
    }

    return roles;
  },
});

/**
 * Check if user has permission
 */
export const hasPermission = query({
  args: {
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    resource: v.string(),
    action: v.string(),
  },
  handler: async (ctx, args) => {
    const userRoles = await ctx.db
      .query("userRoles")
      .filter((q) => q.and(q.eq(q.field("userId"), args.userId), q.eq(q.field("tenantId"), args.tenantId)))
      .collect();

    for (const userRole of userRoles) {
      const rolePermissions = await ctx.db
        .query("rolePermissions")
        .filter((q) => q.eq(q.field("roleId"), userRole.roleId))
        .collect();

      for (const rolePerm of rolePermissions) {
        const permission = await ctx.db.get(rolePerm.permissionId);
        if (permission && permission.resource === args.resource && permission.action === args.action) {
          return true;
        }
      }
    }

    return false;
  },
});
