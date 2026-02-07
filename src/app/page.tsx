import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          EduMyles
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
          Build a modern, multi-tenant school platform faster.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          This starter app scaffolds the Week 1 foundation: tenant-aware routing,
          authentication, and a clean dashboard shell.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          href="/signup"
        >
          Start a school account
        </Link>
        <Link
          className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700"
          href="/login"
        >
          Sign in with magic link
        </Link>
      </div>
    </section>
  );
}
