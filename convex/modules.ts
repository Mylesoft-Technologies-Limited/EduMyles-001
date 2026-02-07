import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all available modules
 */
export const getAvailableModules = query({
  args: {},
  handler: async (ctx) => {
    const modules = await ctx.db
      .query("modules")
      .filter((q) => q.eq(q.field("status"), "available"))
      .collect();

    return modules;
  },
});

/**
 * Get modules by category
 */
export const getModulesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .filter((q) => q.and(q.eq(q.field("status"), "available"), q.eq(q.field("category"), args.category)))
      .collect();

    return modules;
  },
});

/**
 * Get module by ID
 */
export const getModule = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const module = await ctx.db.get(args.moduleId);
    return module;
  },
});

/**
 * Get tenant's installed modules
 */
export const getTenantModules = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const tenantModules = await ctx.db
      .query("tenantModules")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();

    const modules = [];
    for (const tm of tenantModules) {
      const module = await ctx.db.get(tm.moduleId);
      if (module) {
        modules.push({
          ...module,
          tenantModuleId: tm._id,
          status: tm.status,
          config: tm.config,
          installedAt: tm.installedAt,
        });
      }
    }

    return modules;
  },
});

/**
 * Install a module for a tenant
 */
export const installModule = mutation({
  args: {
    tenantId: v.id("tenants"),
    moduleId: v.id("modules"),
    config: v.optional(v.object({})),
  },
  handler: async (ctx, args) => {
    // Check if module is already installed
    const existing = await ctx.db
      .query("tenantModules")
      .filter((q) => q.and(q.eq(q.field("tenantId"), args.tenantId), q.eq(q.field("moduleId"), args.moduleId)))
      .first();

    if (existing) {
      throw new Error("Module already installed");
    }

    // Check if required modules are installed
    const module = await ctx.db.get(args.moduleId);
    if (module && module.requiredModules && module.requiredModules.length > 0) {
      for (const requiredModuleId of module.requiredModules) {
        const requiredInstalled = await ctx.db
          .query("tenantModules")
          .filter(
            (q) =>
              q.and(
                q.eq(q.field("tenantId"), args.tenantId),
                q.eq(q.field("moduleId"), requiredModuleId),
                q.eq(q.field("status"), "installed")
              )
          )
          .first();

        if (!requiredInstalled) {
          throw new Error(`Required module ${requiredModuleId} is not installed`);
        }
      }
    }

    const tenantModuleId = await ctx.db.insert("tenantModules", {
      tenantId: args.tenantId,
      moduleId: args.moduleId,
      status: "installed",
      config: args.config || {},
      installedAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(tenantModuleId);
  },
});

/**
 * Uninstall a module for a tenant
 */
export const uninstallModule = mutation({
  args: {
    tenantId: v.id("tenants"),
    moduleId: v.id("modules"),
  },
  handler: async (ctx, args) => {
    const tenantModule = await ctx.db
      .query("tenantModules")
      .filter((q) => q.and(q.eq(q.field("tenantId"), args.tenantId), q.eq(q.field("moduleId"), args.moduleId)))
      .first();

    if (!tenantModule) {
      throw new Error("Module not installed");
    }

    const module = await ctx.db.get(args.moduleId);
    if (module && module.isCore) {
      throw new Error("Cannot uninstall core modules");
    }

    // Check if other modules depend on this one
    const dependentModules = await ctx.db
      .query("tenantModules")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();

    for (const tm of dependentModules) {
      const mod = await ctx.db.get(tm.moduleId);
      if (mod && mod.requiredModules && mod.requiredModules.includes(args.moduleId)) {
        throw new Error(`Cannot uninstall: other modules depend on this module`);
      }
    }

    await ctx.db.patch(tenantModule._id, {
      status: "uninstalled",
      uninstalledAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(tenantModule._id);
  },
});

/**
 * Update module configuration
 */
export const updateModuleConfig = mutation({
  args: {
    tenantModuleId: v.id("tenantModules"),
    config: v.object({}),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.tenantModuleId, {
      config: args.config,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.tenantModuleId);
  },
});

/**
 * Create a new module (admin only)
 */
export const createModule = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    version: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    isCore: v.optional(v.boolean()),
    requiredModules: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const moduleId = await ctx.db.insert("modules", {
      name: args.name,
      slug: args.slug,
      version: args.version,
      category: args.category,
      description: args.description,
      isCore: args.isCore || false,
      status: "available",
      requiredModules: args.requiredModules || [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(moduleId);
  },
});
