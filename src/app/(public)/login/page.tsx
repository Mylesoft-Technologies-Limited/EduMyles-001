export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold">Welcome back</h1>
      <p className="text-slate-600">
        Enter your school email to receive a magic link.
      </p>
      <form className="flex max-w-md flex-col gap-3">
        <label className="text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@school.edu"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Send magic link
        </button>
      </form>
    </section>
  );
}
