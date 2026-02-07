const metrics = [
  { label: "Total students", value: "0" },
  { label: "Attendance today", value: "0%" },
  { label: "Outstanding invoices", value: "$0" },
  { label: "Active modules", value: "3" }
];

const quickActions = [
  "Add student",
  "Record attendance",
  "Send announcement",
  "Review payments"
];

export default function DashboardPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Evergreen Academy
        </p>
        <h1 className="text-3xl font-semibold">Welcome back, Admin</h1>
        <p className="text-slate-600">
          Here is a quick snapshot of your school today.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-slate-200 p-4"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="text-2xl font-semibold text-slate-900">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action}
              className="rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
