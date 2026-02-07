export default function TenantSettingsPage() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold">School settings</h1>
      <p className="text-slate-600">
        Update branding, academic year, and tenant preferences here.
      </p>
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-slate-600">
        Tenant-specific configuration will appear here after the backend is wired
        up.
      </div>
    </section>
  );
}
