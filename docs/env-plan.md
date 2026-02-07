# Environment Variable Plan

Document environment variables and intended usage. Do not store secrets here.

## Next.js
- `NEXT_PUBLIC_APP_URL`: Base URL for frontend routing and callback URLs.

## Convex
- `CONVEX_DEPLOYMENT`: Convex deployment identifier.
- `NEXT_PUBLIC_CONVEX_URL`: Public Convex URL used by the client.

## WorkOS
- `WORKOS_API_KEY`: API key for WorkOS (server-only).
- `WORKOS_CLIENT_ID`: Client ID for WorkOS (server-only).
- `WORKOS_REDIRECT_URI`: OAuth/SSO callback URL.

## Resend
- `RESEND_API_KEY`: API key for sending transactional emails.
- `RESEND_FROM_EMAIL`: Sender email address or domain.

## Sessions/Auth
- `AUTH_COOKIE_NAME`: Cookie name for session storage.
- `AUTH_SESSION_TTL`: Session expiration in seconds.
