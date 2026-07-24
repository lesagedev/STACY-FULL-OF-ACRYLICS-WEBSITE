export function SectionSeparator() {
  return (
    <div className="relative h-16 md:h-24 -mb-16 md:-mb-24 pointer-events-none select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rotate-45 border border-[var(--accent)]/30 bg-[var(--bg-primary)]" />
      </div>
    </div>
  );
}