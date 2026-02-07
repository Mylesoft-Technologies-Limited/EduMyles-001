export default function SignupPage() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold">Create your school account</h1>
      <p className="text-slate-600">
        Get started with a new tenant and invite your admin team.
      </p>
      <form className="grid gap-4 rounded-lg border border-slate-200 p-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="schoolName">
            School name
          </label>
          <input
            id="schoolName"
            name="schoolName"
            placeholder="Evergreen Academy"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="subdomain">
            Preferred subdomain
          </label>
          <input
            id="subdomain"
            name="subdomain"
            placeholder="evergreen"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="adminName">
            Admin name
          </label>
          <input
            id="adminName"
            name="adminName"
            placeholder="Alex Johnson"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="adminEmail">
            Admin email
          </label>
          <input
            id="adminEmail"
            name="adminEmail"
            type="email"
            placeholder="admin@evergreen.edu"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Create school account
          </button>
        </div>
      </form>
    </section>
  );
}
