type SiteHeaderProps = {
  title: string;
  labels: string[];
  active: number;
  onJump: (index: number) => void;
};

export function SiteHeader({ title, labels, active, onJump }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <p className="font-[family-name:var(--font-hand)] text-3xl leading-none text-[var(--ink)]">{title}</p>
      <div className="flex items-center gap-3">
        <p className="text-sm tabular-nums text-[var(--muted)]">
          {active + 1}/{labels.length}
        </p>
        <nav aria-label="Jump to a step" className="flex max-w-[9.5rem] flex-wrap justify-end gap-1 sm:max-w-none sm:gap-1.5">
          {labels.map((label, index) => {
            const current = index === active;
            return (
              <button
                key={label}
                type="button"
                aria-label={`Step ${index + 1}: ${label}`}
                aria-current={current ? "step" : undefined}
                onClick={() => onJump(index)}
                className={`size-2 rounded-full border sm:size-2.5 ${current ? "border-[var(--green)] bg-[var(--green)]" : "border-[var(--line)] bg-transparent"}`}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
}
