import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * EDUMYLES MULTI-TENANT SCHEMA
 * 
 * Every table includes tenantId for strict data isolation
 * All queries MUST filter by tenantId at the application level
 * 
 * RBAC Hierarchy:
 * - Level 0: Master Admin (global SaaS owner)
 * - Level 1: Reseller Admin (white-label partners)
 * - Level 2: Super Admin (tenant owner)
 * - Level 3: School Admin (principal/head teacher)
 * - Level 4: Functional Staff (role-specific employees)
 * - Level 5: End Users (students/parents/alumni)
 */

// ============================================================================
// TENANT & ORGANIZATION MANAGEMENT
// ============================================================================

export const tenants = defineTable({
  name: v.string(),
  slug: v.string(),
  subdomain: v.string(),
  logo: v.optional(v.string()), // S3 URL
  primaryColor: v.optional(v.string()),
  secondaryColor: v.optional(v.string()),
  country: v.optional(v.string()),
  timezone: v.optional(v.string()),
  currency: v.optional(v.string()),
  status: v.union(v.literal("active"), v.literal("suspended"), v.literal("archived")),
  tier: v.union(v.literal("free"), v.literal("starter"), v.literal("professional"), v.literal("enterprise")),
  maxUsers: v.optional(v.number()),
  maxStudents: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_slug", ["slug"])
  .index("by_subdomain", ["subdomain"]);

export const campuses = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  code: v.string(),
  location: v.optional(v.string()),
  phone: v.optional(v.string()),
  email: v.optional(v.string()),
  principalName: v.optional(v.string()),
  registrationNumber: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_code", ["code"]);

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export const users = defineTable({
  tenantId: v.id("tenants"),
  workosId: v.string(), // WorkOS user ID
  email: v.string(),
  name: v.optional(v.string()),
  phone: v.optional(v.string()),
  avatar: v.optional(v.string()), // S3 URL
  role: v.union(v.literal("user"), v.literal("admin")),
  status: v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended")),
  mfaEnabled: v.optional(v.boolean()),
  lastSignedIn: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_workos_id", ["workosId"])
  .index("by_email", ["email"]);

// ============================================================================
// RBAC (ROLE-BASED ACCESS CONTROL)
// ============================================================================

export const roles = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  level: v.number(), // 0-5 hierarchy level
  description: v.optional(v.string()),
  isSystem: v.optional(v.boolean()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_level", ["level"]);

export const userRoles = defineTable({
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  roleId: v.id("roles"),
  campusId: v.optional(v.id("campuses")),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_user", ["userId"])
  .index("by_role", ["roleId"]);

export const permissions = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  resource: v.string(),
  action: v.string(),
  description: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_resource", ["resource"]);

export const rolePermissions = defineTable({
  tenantId: v.id("tenants"),
  roleId: v.id("roles"),
  permissionId: v.id("permissions"),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_role", ["roleId"]);

// ============================================================================
// MODULE MARKETPLACE & MANAGEMENT
// ============================================================================

export const modules = defineTable({
  name: v.string(),
  slug: v.string(),
  version: v.string(),
  description: v.optional(v.string()),
  icon: v.optional(v.string()), // S3 URL or SVG
  category: v.union(
    v.literal("core"),
    v.literal("academic"),
    v.literal("finance"),
    v.literal("operations"),
    v.literal("communication"),
    v.literal("hr"),
    v.literal("integration"),
    v.literal("ai")
  ),
  isCore: v.optional(v.boolean()),
  status: v.union(v.literal("available"), v.literal("deprecated"), v.literal("beta")),
  requiredModules: v.optional(v.array(v.string())),
  documentation: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_slug", ["slug"])
  .index("by_category", ["category"]);

export const tenantModules = defineTable({
  tenantId: v.id("tenants"),
  moduleId: v.id("modules"),
  status: v.union(v.literal("installed"), v.literal("disabled"), v.literal("uninstalled")),
  config: v.optional(v.object({})),
  installedAt: v.number(),
  uninstalledAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_module", ["moduleId"])
  .index("by_status", ["status"]);

// ============================================================================
// CORE MODULE: USER MANAGEMENT
// ============================================================================

export const staffMembers = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.id("campuses"),
  userId: v.optional(v.id("users")),
  firstName: v.string(),
  lastName: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  tscNumber: v.optional(v.string()), // Teacher Service Commission number (Kenya)
  employeeId: v.string(),
  designation: v.optional(v.string()),
  department: v.optional(v.string()),
  dateOfBirth: v.optional(v.string()),
  gender: v.optional(v.union(v.literal("M"), v.literal("F"), v.literal("Other"))),
  idNumber: v.optional(v.string()),
  bankAccount: v.optional(v.string()),
  bankCode: v.optional(v.string()),
  nssf: v.optional(v.string()),
  shif: v.optional(v.string()),
  status: v.union(v.literal("active"), v.literal("on_leave"), v.literal("suspended"), v.literal("terminated")),
  hireDate: v.optional(v.string()),
  terminationDate: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_campus", ["campusId"])
  .index("by_email", ["email"])
  .index("by_tsc", ["tscNumber"]);

export const students = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.id("campuses"),
  userId: v.optional(v.id("users")),
  admissionNumber: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  dateOfBirth: v.optional(v.string()),
  gender: v.optional(v.union(v.literal("M"), v.literal("F"), v.literal("Other"))),
  upi: v.optional(v.string()), // Unique Personal Identifier (Kenya KEMIS)
  idNumber: v.optional(v.string()),
  parentName: v.optional(v.string()),
  parentPhone: v.optional(v.string()),
  parentEmail: v.optional(v.string()),
  status: v.union(v.literal("active"), v.literal("graduated"), v.literal("transferred"), v.literal("suspended")),
  admissionDate: v.optional(v.string()),
  graduationDate: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_campus", ["campusId"])
  .index("by_admission", ["admissionNumber"])
  .index("by_upi", ["upi"])
  .index("by_email", ["email"]);

export const parents = defineTable({
  tenantId: v.id("tenants"),
  userId: v.optional(v.id("users")),
  firstName: v.string(),
  lastName: v.string(),
  email: v.string(),
  phone: v.string(),
  relationship: v.optional(v.string()),
  idNumber: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_email", ["email"]);

export const studentParents = defineTable({
  tenantId: v.id("tenants"),
  studentId: v.id("students"),
  parentId: v.id("parents"),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_student", ["studentId"]);

// ============================================================================
// CORE MODULE: ACADEMIC MANAGEMENT
// ============================================================================

export const academicYears = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  startDate: v.string(),
  endDate: v.string(),
  isCurrent: v.optional(v.boolean()),
  status: v.union(v.literal("planning"), v.literal("active"), v.literal("closed")),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"]);

export const terms = defineTable({
  tenantId: v.id("tenants"),
  academicYearId: v.id("academicYears"),
  name: v.string(),
  termNumber: v.number(),
  startDate: v.string(),
  endDate: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_academic_year", ["academicYearId"]);

export const classes = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.id("campuses"),
  name: v.string(),
  classTeacherId: v.optional(v.id("staffMembers")),
  capacity: v.optional(v.number()),
  stream: v.optional(v.string()),
  level: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_campus", ["campusId"]);

export const subjects = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  code: v.string(),
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_code", ["code"]);

export const classSubjects = defineTable({
  tenantId: v.id("tenants"),
  classId: v.id("classes"),
  subjectId: v.id("subjects"),
  teacherId: v.id("staffMembers"),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_class", ["classId"]);

export const studentClasses = defineTable({
  tenantId: v.id("tenants"),
  studentId: v.id("students"),
  classId: v.id("classes"),
  academicYearId: v.id("academicYears"),
  enrollmentDate: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_student", ["studentId"])
  .index("by_class", ["classId"]);

// ============================================================================
// CORE MODULE: ATTENDANCE
// ============================================================================

export const attendance = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.id("campuses"),
  classId: v.id("classes"),
  studentId: v.id("students"),
  date: v.string(),
  status: v.union(v.literal("present"), v.literal("absent"), v.literal("late"), v.literal("excused"), v.literal("sick")),
  remarks: v.optional(v.string()),
  recordedBy: v.optional(v.id("staffMembers")),
  recordedAt: v.optional(v.number()),
  isOfflineSync: v.optional(v.boolean()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_student", ["studentId"])
  .index("by_date", ["date"])
  .index("by_class", ["classId"]);

// ============================================================================
// CORE MODULE: TIMETABLING
// ============================================================================

export const timetables = defineTable({
  tenantId: v.id("tenants"),
  classId: v.id("classes"),
  academicYearId: v.id("academicYears"),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_class", ["classId"]);

export const timetableSlots = defineTable({
  tenantId: v.id("tenants"),
  timetableId: v.id("timetables"),
  dayOfWeek: v.number(),
  startTime: v.string(),
  endTime: v.string(),
  subjectId: v.id("subjects"),
  teacherId: v.id("staffMembers"),
  room: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_timetable", ["timetableId"]);

// ============================================================================
// CORE MODULE: FEE MANAGEMENT
// ============================================================================

export const feeStructures = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.id("campuses"),
  classId: v.id("classes"),
  academicYearId: v.id("academicYears"),
  name: v.string(),
  totalAmount: v.number(),
  currency: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_class", ["classId"]);

export const feeItems = defineTable({
  tenantId: v.id("tenants"),
  feeStructureId: v.id("feeStructures"),
  name: v.string(),
  amount: v.number(),
  description: v.optional(v.string()),
  isOptional: v.optional(v.boolean()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_fee_structure", ["feeStructureId"]);

export const invoices = defineTable({
  tenantId: v.id("tenants"),
  studentId: v.id("students"),
  invoiceNumber: v.string(),
  feeStructureId: v.id("feeStructures"),
  dueDate: v.optional(v.string()),
  totalAmount: v.number(),
  paidAmount: v.optional(v.number()),
  status: v.union(
    v.literal("draft"),
    v.literal("issued"),
    v.literal("partially_paid"),
    v.literal("paid"),
    v.literal("overdue"),
    v.literal("cancelled")
  ),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_student", ["studentId"])
  .index("by_invoice_number", ["invoiceNumber"]);

export const payments = defineTable({
  tenantId: v.id("tenants"),
  invoiceId: v.id("invoices"),
  studentId: v.id("students"),
  amount: v.number(),
  paymentMethod: v.union(
    v.literal("mpesa"),
    v.literal("flutterwave"),
    v.literal("paystack"),
    v.literal("bank_transfer"),
    v.literal("cash"),
    v.literal("cheque")
  ),
  transactionId: v.optional(v.string()),
  status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed"), v.literal("cancelled")),
  receiptUrl: v.optional(v.string()),
  receiptNumber: v.optional(v.string()),
  paymentDate: v.optional(v.number()),
  metadata: v.optional(v.object({})),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_invoice", ["invoiceId"])
  .index("by_transaction", ["transactionId"]);

// ============================================================================
// CORE MODULE: COMMUNICATIONS
// ============================================================================

export const announcements = defineTable({
  tenantId: v.id("tenants"),
  campusId: v.optional(v.id("campuses")),
  title: v.string(),
  content: v.string(),
  priority: v.union(v.literal("low"), v.literal("normal"), v.literal("high"), v.literal("urgent")),
  targetRoles: v.optional(v.array(v.string())),
  status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
  publishedAt: v.optional(v.number()),
  createdBy: v.id("users"),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_status", ["status"]);

export const notifications = defineTable({
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  type: v.string(),
  title: v.string(),
  content: v.optional(v.string()),
  relatedId: v.optional(v.string()),
  isRead: v.optional(v.boolean()),
  readAt: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_user", ["userId"])
  .index("by_is_read", ["isRead"]);

export const smsLogs = defineTable({
  tenantId: v.id("tenants"),
  recipientPhone: v.string(),
  recipientName: v.optional(v.string()),
  message: v.string(),
  type: v.string(),
  status: v.union(v.literal("queued"), v.literal("sent"), v.literal("failed"), v.literal("delivered")),
  externalId: v.optional(v.string()),
  cost: v.optional(v.number()),
  failureReason: v.optional(v.string()),
  sentAt: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_status", ["status"]);

// ============================================================================
// HR & PAYROLL (Kenya 2026 Compliance)
// ============================================================================

export const payrollPeriods = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  startDate: v.string(),
  endDate: v.string(),
  status: v.union(v.literal("draft"), v.literal("processing"), v.literal("completed"), v.literal("paid")),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"]);

export const payslips = defineTable({
  tenantId: v.id("tenants"),
  staffId: v.id("staffMembers"),
  payrollPeriodId: v.id("payrollPeriods"),
  basicSalary: v.number(),
  grossSalary: v.number(),
  nssfDeduction: v.optional(v.number()),
  shifDeduction: v.optional(v.number()),
  payeDeduction: v.optional(v.number()),
  housingLevyDeduction: v.optional(v.number()),
  personalRelief: v.optional(v.number()),
  otherDeductions: v.optional(v.number()),
  totalDeductions: v.number(),
  netSalary: v.number(),
  status: v.union(v.literal("draft"), v.literal("approved"), v.literal("paid"), v.literal("cancelled")),
  pdfUrl: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_staff", ["staffId"])
  .index("by_period", ["payrollPeriodId"]);

// ============================================================================
// KEMIS COMPLIANCE (Kenya Education Management Information System)
// ============================================================================

export const kemisExports = defineTable({
  tenantId: v.id("tenants"),
  exportType: v.union(
    v.literal("student_data"),
    v.literal("teacher_data"),
    v.literal("attendance_logs"),
    v.literal("exam_results"),
    v.literal("financial_data")
  ),
  status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed")),
  fileUrl: v.optional(v.string()),
  recordCount: v.optional(v.number()),
  errorMessage: v.optional(v.string()),
  exportedAt: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_status", ["status"]);

// ============================================================================
// OFFLINE SYNC & PWA
// ============================================================================

export const offlineSyncQueue = defineTable({
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  operation: v.union(v.literal("create"), v.literal("update"), v.literal("delete")),
  entity: v.string(),
  entityId: v.optional(v.string()),
  data: v.object({}),
  status: v.union(v.literal("pending"), v.literal("synced"), v.literal("failed")),
  errorMessage: v.optional(v.string()),
  syncedAt: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_user", ["userId"])
  .index("by_status", ["status"]);

// ============================================================================
// AI & AUDIT LOGGING
// ============================================================================

export const aiTokenUsage = defineTable({
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  feature: v.string(),
  inputTokens: v.optional(v.number()),
  outputTokens: v.optional(v.number()),
  totalTokens: v.optional(v.number()),
  cost: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_user", ["userId"]);

export const auditLogs = defineTable({
  tenantId: v.id("tenants"),
  userId: v.optional(v.id("users")),
  action: v.string(),
  resource: v.string(),
  resourceId: v.optional(v.string()),
  changes: v.optional(v.object({})),
  ipAddress: v.optional(v.string()),
  userAgent: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_user", ["userId"])
  .index("by_resource", ["resource"]);

export default defineSchema({
  // Tenant & Organization
  tenants,
  campuses,

  // User & Authentication
  users,

  // RBAC
  roles,
  userRoles,
  permissions,
  rolePermissions,

  // Module Marketplace
  modules,
  tenantModules,

  // User Management
  staffMembers,
  students,
  parents,
  studentParents,

  // Academic Management
  academicYears,
  terms,
  classes,
  subjects,
  classSubjects,
  studentClasses,

  // Attendance
  attendance,

  // Timetabling
  timetables,
  timetableSlots,

  // Fee Management
  feeStructures,
  feeItems,
  invoices,
  payments,

  // Communications
  announcements,
  notifications,
  smsLogs,

  // HR & Payroll
  payrollPeriods,
  payslips,

  // KEMIS
  kemisExports,

  // Offline Sync
  offlineSyncQueue,

  // AI & Audit
  aiTokenUsage,
  auditLogs,
});
