export function EmptyState() {
  return (
    <div className="flex flex-col items-center px-6 py-24 text-center">
      <div className="h-12 w-12 rounded-full border border-line" aria-hidden />
      <p className="mt-5 text-[15px] text-ink">No photos yet</p>
      <p className="mt-1 text-[13px] text-muted">Be the first to add one.</p>
    </div>
  );
}
