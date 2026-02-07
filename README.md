# EduMyles - School Management SaaS Platform

A comprehensive, production-ready multi-tenant School Management SaaS platform purpose-built for African educational institutions, with primary focus on the Kenyan market.

## 🎯 Core Features

### Multi-Tenant Architecture
- **Subdomain Routing**: Each school operates as an isolated tenant with subdomain-based access (`school-name.edumyles.com`)
- **Strict Data Isolation**: Tenant data isolation via `tenantId` filtering on all database queries
- **Customizable Branding**: Logo, colors, and domain customization per tenant

### 6-Level Hierarchical RBAC
1. **Master Admin (Level 0)**: Global SaaS owner
2. **Reseller Admin (Level 1)**: White-label partners
3. **Super Admin (Level 2)**: Tenant owner
4. **School Admin (Level 3)**: Principal/head teacher
5. **Functional Staff (Level 4)**: Role-specific employees
6. **End Users (Level 5)**: Students/parents/alumni

### Module Marketplace
- **Self-Service Module Store**: Browse, install, configure, and uninstall feature modules on demand
- **6 Core Modules**: User Management, Academic Management, Attendance, Timetabling, Fee Management, Communications
- **15 Optional Modules**: Transport, Library, Hostel/Boarding, LMS, Medical, Alumni, HR & Payroll, Inventory & Assets, Canteen/E-Wallet, Sports, Admissions, Parent-Teacher Meetings, Disciplinary Tracking, Project Management, AI Assistant

### African Payment Integration
- **M-Pesa STK Push**: Direct payment prompts via Safaricom Daraja API
- **Flutterwave & Paystack**: Alternative payment gateways
- **Bank Transfers & Cash Payments**: Manual payment tracking
- **Automated Receipt Generation**: PDF receipts with SMS delivery

### Communications
- **SMS Notifications via Africa's Talking**: Attendance alerts, fee receipts, exam timetables, announcements, emergency notifications, meeting reminders
- **Push Notifications**: Real-time updates for dashboards
- **Multi-Channel**: SMS, push, in-app notifications

### KEMIS Compliance (Kenya)
- **Student Data Export**: With UPI (Unique Personal Identifier)
- **Teacher Data Export**: With TSC numbers
- **Attendance Logs Export**: Daily attendance records
- **Exam Results Export**: Academic performance data
- **Financial Data Export**: Fee and payment records

### HR & Payroll (Kenya 2026 Compliance)
- **NSSF Deduction**: 6% capped at KES 6,480/month
- **SHIF Deduction**: 2.75%
- **PAYE**: Progressive tax bands (10%-35%)
- **Housing Levy**: 1.5%
- **Personal Relief**: KES 2,400/month
- **Automated Payslip Generation**: PDF payslips with audit trail

### Progressive Web App (PWA)
- **Offline-First Architecture**: Critical features work without internet
- **Service Worker Caching**: Automatic asset caching
- **Background Sync**: Queued operations sync when online
- **Push Notifications**: Real-time alerts even when offline
- **Mobile-Optimized**: Responsive design for all devices

### AI Capabilities (Myles AI)
- **Lesson Plan Generation**: AI-assisted curriculum planning
- **Quiz/Exam Question Generation**: Automated assessment creation
- **Student Performance Prediction**: Predictive analytics for at-risk students
- **Dropout Risk Alerts**: Early warning system
- **Automated Grading Assistance**: AI-powered grading support
- **OpenRouter Integration**: Compatible with OpenAI SDK

### Multi-Campus Support
- **Hierarchical Organization**: Multiple branches/campuses within tenants
- **Comparative Analytics**: Cross-campus performance metrics
- **Resource Allocation**: Centralized resource management

## 🏗️ Technology Stack

### Frontend
- **Next.js 15.x**: App Router, server components, optimized performance
- **React 19**: Latest React features and hooks
- **TypeScript**: Strict mode for type safety
- **Tailwind CSS 4**: Utility-first styling
- **Shadcn/UI**: High-quality component library

### Backend
- **Convex**: Backend-as-a-service platform
  - Real-time database with subscriptions
  - Cloud functions (queries, mutations, actions)
  - File storage integration
  - Scheduled jobs
  - Vector search capabilities
  - Real-time updates via WebSockets

### Authentication
- **WorkOS**: Enterprise authentication
  - SSO support for enterprise tenants
  - Email/password authentication
  - Google social auth
  - MFA for admin roles
  - Free for up to 1,000,000 users

### Integrations
- **M-Pesa**: Safaricom Daraja API for STK Push
- **Flutterwave**: Multi-currency payment processing
- **Paystack**: Payment gateway integration
- **Africa's Talking**: SMS and communication APIs
- **OpenRouter**: AI capabilities (lesson plans, questions, predictions)
- **AWS S3 / Cloudflare R2**: File storage

### Deployment
- **Vercel**: Frontend hosting (Next.js optimized)
- **Convex Cloud**: Backend hosting
- **Cloudflare CDN**: Static asset delivery
- **Custom Domains**: Wildcard subdomain support (*.edumyles.com)

## 📊 Performance Targets

- **Page Load Time**: < 2 seconds (3G)
- **Time to Interactive (TTI)**: < 3 seconds
- **First Contentful Paint (FCP)**: < 1 second
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Database Query Response**: < 100ms (p95)
- **Real-time Update Latency**: < 500ms

## 🔒 Security & Compliance

- **Tenant Data Isolation**: Row-level filtering on all queries
- **Role-Based Permission Enforcement**: Every query/mutation enforces permissions
- **Audit Logging**: All sensitive actions logged with timestamps
- **MFA for Admins**: Multi-factor authentication for admin roles
- **HTTPS/TLS**: All communication encrypted
- **Data Encryption**: Sensitive data (salaries, medical records) encrypted at rest
- **Kenya Data Protection Act**: Full compliance
- **Immutable Audit Trails**: Tamper-proof audit logs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- Convex account
- WorkOS account

### Installation

```bash
# Clone the repository
git clone https://github.com/Mylesoft-Technologies-Limited/EduMyles-001.git
cd edumyles-saas

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run Convex development server
npx convex dev

# Run Next.js development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
edumyles-saas/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   └── [tenant]/          # Tenant-specific routes
├── components/            # Reusable React components
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── auth.ts            # Authentication functions
│   ├── tenants.ts         # Tenant management
│   ├── modules.ts         # Module marketplace
│   └── ...                # Other domain functions
├── lib/                   # Utility functions
├── public/                # Static assets
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔑 Environment Variables

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-team.convex.cloud

# WorkOS
WORKOS_CLIENT_ID=your_workos_client_id
WORKOS_API_KEY=your_workos_api_key
WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payment Gateways
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_key
PAYSTACK_PUBLIC_KEY=your_paystack_key

# SMS
AFRICAS_TALKING_API_KEY=your_africas_talking_key
AFRICAS_TALKING_USERNAME=your_africas_talking_username

# AI
OPENROUTER_API_KEY=your_openrouter_key

# File Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Module Development Guide](./docs/MODULES.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Security Guide](./docs/SECURITY.md)

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Run end-to-end tests
pnpm test:e2e

# Generate coverage report
pnpm test:coverage
```

## 📈 Scalability

- **Convex Funrun**: Horizontally scalable function runner for high-throughput operations
- **Database Indexing**: Strategic indexing for high-frequency queries
- **Caching Strategy**: Multi-layer caching for performance
- **Rate Limiting**: Quota management for SMS and AI tokens per tenant
- **Batch Operations**: Efficient bulk data processing

## 🤝 Contributing

Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Support

For support, please contact support@edumyles.com or visit our [Help Center](https://help.edumyles.com).

## 🗺️ Roadmap

- **Q1 2026**: Core modules launch, KEMIS integration
- **Q2 2026**: AI Assistant (Myles AI) launch
- **Q3 2026**: Mobile apps (iOS/Android) launch
- **Q4 2026**: Advanced analytics and reporting
- **2027**: University and TVET institution support

---

**Built with ❤️ for African Education**
