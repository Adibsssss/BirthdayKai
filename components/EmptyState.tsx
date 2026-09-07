export function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-line bg-paper/70 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-2xl shadow-sm" aria-hidden>♡</div>
      <p className="mt-5 font-display text-2xl text-ink">The first memory is waiting.</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">Add a favorite photo to start Kai&apos;s birthday book.</p>
    </div>
  );
}
