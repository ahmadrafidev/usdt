"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter, PieceFilter } from "@/lib/chapters";
import { ChapterCopy } from "@/components/explainer/chapter-copy";
import { Coin } from "@/components/explainer/coin";
import { SiteHeader } from "@/components/explainer/site-header";

type ExplainerProps = {
  chapters: Chapter[];
};

export function Explainer({ chapters }: ExplainerProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(1);
  const [filter, setFilter] = useState<PieceFilter>("all");
  const [reduced, setReduced] = useState(false);
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const probe = window.innerHeight * 0.42;
      let nextIndex = 0;
      let nextProgress = 1;

      sections.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          nextIndex = index;
          const traveled = probe - rect.top;
          nextProgress = Math.min(1, Math.max(0, traveled / (window.innerHeight * 0.32)));
        }
      });

      setActive(nextIndex);
      setProgress(reduced ? 1 : nextProgress);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  const jump = (index: number) => {
    sections.current[index]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-2 z-40 border border-[var(--line)] sm:inset-3" aria-hidden="true">
        <span className="absolute -top-1 -left-1 size-2 rounded-full border border-[var(--line)] bg-[var(--paper)]" />
        <span className="absolute -top-1 -right-1 size-2 rounded-full border border-[var(--line)] bg-[var(--paper)]" />
        <span className="absolute -bottom-1 -left-1 size-2 rounded-full border border-[var(--line)] bg-[var(--paper)]" />
        <span className="absolute -right-1 -bottom-1 size-2 rounded-full border border-[var(--line)] bg-[var(--paper)]" />
      </div>

      <SiteHeader
        title="What is USDT?"
        labels={chapters.map((chapter) => chapter.title)}
        active={active}
        onJump={jump}
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="sticky top-28 z-20 h-[42vh] border-b border-[var(--line)] bg-[var(--paper)] lg:h-[calc(100vh-7rem)] lg:border-r lg:border-b-0">
          <Coin
            scene={chapters[active].scene}
            previous={chapters[Math.max(0, active - 1)].scene}
            progress={progress}
            filter={chapters[active].showFilter ? filter : "all"}
            reduced={reduced}
          />
        </div>
        <div>
          {chapters.map((chapter, index) => (
            <ChapterCopy
              key={chapter.id}
              ref={(node) => {
                sections.current[index] = node;
              }}
              chapter={chapter}
              index={index}
              filter={filter}
              onFilter={setFilter}
            />
          ))}
          <footer className="space-y-2 px-5 pb-16 text-sm leading-6 text-[var(--muted)] sm:px-10 lg:px-14">
            <p>
              Not affiliated with Tether. Figures are taken from Tether’s public pages and can change. The
              Ethereum contract’s decimal count was read from the contract Tether publishes.
            </p>
            <p>
              Built by{" "}
              <a
                href="https://x.com/rafiiwirana"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--green)]"
              >
                @rafiiwirana
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
