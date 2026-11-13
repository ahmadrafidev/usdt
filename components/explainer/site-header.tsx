import type { Ref } from "react";
import { ThemeToggle } from "@/components/explainer/theme-toggle";

type SiteHeaderProps = {
  title: string;
  labels: string[];
  active: number;
  onJump: (index: number) => void;
  ref?: Ref<HTMLElement>;
};

export function SiteHeader({ title, labels, active, onJump, ref }: SiteHeaderProps) {
  return (
    <header
      ref={ref}
      className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/95 px-4 py-3 backdrop-blur-sm sm:px-6"
    >
      <p className="text-center font-[family-name:var(--font-hand)] text-3xl md:text-5xl leading-none text-[var(--ink)]">
        {title}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <p className="grid size-14 shrink-0 place-items-center rounded-2xl border-2 border-[var(--green)] font-[family-name:var(--font-hand)] text-3xl leading-none text-[var(--green)]">
          {active + 1}
        </p>
        <div className="min-w-0 flex-1">
          <p className="text-xs tracking-wide text-[var(--muted)]">of {labels.length}</p>
          <p className="truncate text-base text-[var(--ink)]">{labels[active]}</p>
        </div>
        <ThemeToggle />
      </div>
      <nav aria-label="Jump to a step" className="mt-3 flex h-1.5 gap-0.5">
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
