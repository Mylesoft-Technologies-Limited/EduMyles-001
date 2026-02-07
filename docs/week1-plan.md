# EduMyles Week 1 Development Plan (Strategy Only)

## Objective
Deliver a working multi-tenant platform foundation: school signup, tenant isolation, basic dashboard, and navigation.

---

## Day 1: Project Setup & Environment
**Goal:** Ready-to-build workspace with all services configured.

### Morning
- Initialize Next.js 15 + TypeScript with App Router.
- Add Tailwind CSS and shadcn/ui.
- Create baseline folder structure.
- Connect Convex dev server + data flow smoke test.
- Configure WorkOS and Resend keys locally.
- Initialize Git, .gitignore, first commit, and GitHub remote.

### Afternoon
- Finalize route folder layout (public, auth, tenant).
- Create `env` files and document keys.
- Install essential dependencies (forms, dates, UI).
- Create root/auth/public layouts with metadata.
- Run dev server and confirm hot reload + Convex connectivity.

**Checkpoint**
- Dev server runs without errors.
- Navigation between pages works.
- Convex responds to queries/mutations.
- WorkOS/Resend keys configured locally.

---

## Day 2: Multi-Tenancy Foundation
**Goal:** Tenant schema + routing based on subdomain.

### Morning
- Design tenant schema, ID format, and settings model.
- Define tenant isolation strategy and indexes.

### Afternoon
- Implement tenant table + creation flow.
- Build subdomain middleware and tenant context provider.
- Add tenant validation + error states.

**Checkpoint**
- Tenant creation works.
- Subdomain routing resolves tenants.
- Tenant context accessible in app.

---

## Day 3: Passwordless Auth (Magic Links)
**Goal:** Users can log in via email magic link.

### Morning
- Define user and magic-link schemas.
- Plan token expiration, rate limits, and session rules.

### Afternoon
- Implement user + magic-link tables.
- Generate magic link tokens and send email via Resend.
- Verify token, create session, set cookie, and redirect.

**Checkpoint**
- Magic link flow works end-to-end.
- Session persists across refreshes.

---

## Day 4: School Signup & Onboarding
**Goal:** New school can sign up, create tenant, and onboard.

### Morning
- Define signup form fields, validation, and subdomain rules.
- Draft onboarding wizard steps and flow.

### Afternoon
- Build signup form with subdomain availability checks.
- Create tenant + admin user in one flow.
- Send welcome email and route to onboarding wizard.
- Apply default school settings.

**Checkpoint**
- New school signup works.
- Admin receives magic link and can log in.

---

## Day 5: Module Marketplace Foundation
**Goal:** Modular marketplace with install/uninstall flows.

### Morning
- Define module registry schema and install tracking model.
- Decide core vs optional modules.

### Afternoon
- Implement module registry + seed initial modules.
- Add install/uninstall logic and guard core modules.
- Build marketplace page with module cards.
- Auto-install core modules on tenant creation.

**Checkpoint**
- Modules show installed state and persist.
- Core modules are always active.

---

## Day 6: Student Management (Core Module)
**Goal:** Add/view/edit students for a tenant.

### Morning
- Define student schema and ID/admission number formats.
- Plan table views, filters, and profile page.

### Afternoon
- Implement student CRUD functions.
- Build student list page + filters + search.
- Build student profile view.

**Checkpoint**
- Students can be created, listed, and edited.
- Tenant isolation works for student data.

---

## Day 7: Dashboard & Navigation
**Goal:** Dashboard, navigation, and polished UX.

### Morning
- Define dashboard metrics + layout.
- Plan navigation structure and module-based visibility.

### Afternoon
- Implement dashboard data function and UI.
- Build navigation (desktop + mobile) and user menu.
- Add breadcrumbs, loading states, and empty states.

**Checkpoint**
- Dashboard shows accurate metrics.
- Navigation respects installed modules.

---

## Week 1 Completion Criteria
- Multi-tenant isolation enforced in all queries.
- Passwordless auth working with session persistence.
- School signup + onboarding functional.
- Module marketplace operational.
- Students module working.
- Dashboard and navigation shipped.
