type SiteHeaderProps = {
  title: string;
  labels: string[];
  active: number;
  onJump: (index: number) => void;
};

export function SiteHeader({ title, labels, active, onJump }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-[family-name:var(--font-hand)] text-3xl leading-none text-[var(--ink)]">{title}</p>
        <p className="shrink-0 text-sm tabular-nums text-[var(--muted)]">
          {active + 1} of {labels.length}
        </p>
      </div>
      <p className="mt-2 truncate text-sm text-[var(--ink)]">{labels[active]}</p>
      <nav aria-label="Jump to a step" className="mt-2 flex h-1.5 gap-0.5">
        {labels.map((label, index) => {
          const reached = index <= active;
          return (
            <button
              key={label}
              type="button"
              aria-label={`Step ${index + 1}: ${label}`}
              aria-current={index === active ? "step" : undefined}
              onClick={() => onJump(index)}
              className={`h-full min-w-0 flex-1 rounded-full ${reached ? "bg-[var(--green)]" : "bg-[var(--line)]"}`}
            />
          );
        })}
      </nav>
    </header>
  );
}
