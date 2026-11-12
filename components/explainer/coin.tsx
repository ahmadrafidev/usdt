"use client";

import type { ReactNode } from "react";
import type { PieceFilter, SceneId } from "@/lib/chapters";
import { billions, chainRemainder, circulation, reserves } from "@/lib/facts";

type LayerId =
  | "coin"
  | "ledger"
  | "contract"
  | "chains"
  | "mint"
  | "reserves"
  | "yield"
  | "peg"
  | "freeze"
  | "terms";

type Xform = {
  opacity: number;
  x: number;
  y: number;
  scale: number;
};

const LAYER_IDS: LayerId[] = [
  "coin",
  "ledger",
  "contract",
  "chains",
  "mint",
  "reserves",
  "yield",
  "peg",
  "freeze",
  "terms",
];

const LAYER_SIDE: Record<LayerId, "record" | "tether" | "both"> = {
  coin: "both",
  ledger: "record",
  contract: "record",
  chains: "record",
  mint: "both",
  reserves: "tether",
  yield: "tether",
  peg: "both",
  freeze: "record",
  terms: "tether",
};

const INK = "#24312c";
const GREEN = "#0e8f6e";
const PAPER = "#f6f4ef";

type CoinProps = {
  scene: SceneId;
  previous: SceneId;
  progress: number;
  filter: PieceFilter;
  reduced: boolean;
};

function at(x: number, y: number, scale: number, opacity = 1): Xform {
  return { opacity, x, y, scale };
}

function hidden(near: Xform): Xform {
  return { ...near, opacity: 0, scale: near.scale * 0.92 };
}

function layout(scene: SceneId): Record<LayerId, Xform> {
  const coin = at(320, 330, 1.05);
  const ledger = at(320, 455, 1);
  const contract = at(430, 340, 1);
  const chains = at(320, 430, 1);
  const mint = at(330, 400, 1);
  const reserveCard = at(320, 360, 1);
  const yieldMark = at(430, 340, 1);
  const peg = at(320, 380, 1);
  const freeze = at(320, 390, 1);
  const terms = at(330, 370, 1);

  const blank: Record<LayerId, Xform> = {
    coin: hidden(coin),
    ledger: hidden(ledger),
    contract: hidden(contract),
    chains: hidden(chains),
    mint: hidden(mint),
    reserves: hidden(reserveCard),
    yield: hidden(yieldMark),
    peg: hidden(peg),
    freeze: hidden(freeze),
    terms: hidden(terms),
  };

  if (scene === "intro") {
    return { ...blank, coin };
  }

  if (scene === "ledger") {
    return { ...blank, coin: at(340, 185, 0.7), ledger: at(340, 470, 0.92) };
  }

  if (scene === "contract") {
    return {
      ...blank,
      coin: at(210, 230, 0.58, 0.45),
      contract,
    };
  }

  if (scene === "chains") {
    return { ...blank, coin: at(320, 195, 0.62), chains };
  }

  if (scene === "mint") {
    return { ...blank, coin: at(320, 175, 0.48, 0.4), mint };
  }

  if (scene === "reserves") {
    return { ...blank, coin: at(320, 145, 0.4), reserves: reserveCard };
  }

  if (scene === "yield") {
    return { ...blank, coin: at(210, 330, 0.72), yield: yieldMark };
  }

  if (scene === "peg") {
    return { ...blank, coin: at(320, 155, 0.4, 0.55), peg };
  }

  if (scene === "freeze") {
    return { ...blank, coin: at(320, 155, 0.38, 0.35), freeze };
  }

  if (scene === "terms") {
    return { ...blank, coin: at(320, 160, 0.36, 0.3), terms };
  }

  return {
    coin: at(160, 145, 0.34),
    ledger: at(470, 150, 0.52),
    contract: at(165, 325, 0.64),
    chains: at(470, 320, 0.58),
    mint: hidden(mint),
    reserves: at(165, 520, 0.48),
    yield: hidden(yieldMark),
    peg: hidden(peg),
    freeze: hidden(freeze),
    terms: at(470, 510, 0.52),
  };
}

function mix(from: Xform, to: Xform, t: number): Xform {
  return {
    opacity: from.opacity + (to.opacity - from.opacity) * t,
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
    scale: from.scale + (to.scale - from.scale) * t,
  };
}

function blendScenes(scene: SceneId, previous: SceneId, progress: number): Record<LayerId, Xform> {
  const next = layout(scene);
  if (scene === previous) return next;
  const prior = layout(previous);
  const raw = Math.min(1, Math.max(0, progress));
  const t = raw >= 0.8 ? 1 : raw / 0.8;
  return Object.fromEntries(
    LAYER_IDS.map((id) => [id, mix(prior[id], next[id], t)]),
  ) as Record<LayerId, Xform>;
}

function applyFilter(pose: Record<LayerId, Xform>, filter: PieceFilter) {
  if (filter === "all") return pose;
  return Object.fromEntries(
    LAYER_IDS.map((id) => {
      const side = LAYER_SIDE[id];
      const dim = side !== "both" && side !== filter;
      const current = pose[id];
      return [id, dim ? { ...current, opacity: current.opacity * 0.14 } : current];
    }),
  ) as Record<LayerId, Xform>;
}

function Reed({ radius }: { radius: number }) {
  return (
    <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
      {Array.from({ length: 80 }, (_, index) => {
        const angle = (index / 80) * Math.PI * 2;
        const inner = radius - 8;
        const round = (value: number) => Math.round(value * 100) / 100;
        return (
          <line
            key={index}
            x1={round(Math.cos(angle) * inner)}
            y1={round(Math.sin(angle) * inner)}
            x2={round(Math.cos(angle) * radius)}
            y2={round(Math.sin(angle) * radius)}
          />
        );
      })}
    </g>
  );
}

function CoinFace() {
  return (
    <g>
      <circle r="138" fill={PAPER} stroke={INK} strokeWidth="3" />
      <Reed radius={132} />
      <circle r="116" fill="#d9f0e7" stroke={INK} strokeWidth="2.5" />
      <circle r="116" fill="url(#hatch)" />
      <path
        d="M -48 -46 H 48 V -24 H 16 V 54 H -16 V -24 H -48 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="0"
        cy="6"
        rx="62"
        ry="16"
        fill="none"
        stroke={INK}
        strokeWidth="3"
      />
      <path id="coin-ring" d="M0,-104 A104,104 0 1,1 -0.1,-104" fill="none" />
      <text fill={INK} fontSize="11" fontFamily="var(--font-geist-sans), sans-serif" letterSpacing="1.5">
        <textPath href="#coin-ring">
          USD₮ · ONE DOLLAR · ONE TOKEN · USD₮ · ONE DOLLAR · ONE TOKEN ·
        </textPath>
      </text>
    </g>
  );
}

function LedgerSheet({ mode }: { mode: "balance" | "mint" | "frozen" }) {
  const rows = [
    ["0x91…c4", "18,204.11"],
    ["0x4a…90", "1,258.00"],
    ["0x7c…1e", "1.000000"],
    ["0x3d…aa", "64.80"],
    ["0xb2…17", "900.00"],
  ];

  return (
    <g>
      <ellipse rx="168" ry="78" fill="#efeae2" stroke={INK} strokeWidth="2.5" />
      <ellipse rx="168" ry="78" fill="url(#ledger-shade)" />
      <text
        x="-146"
        y="-52"
        fill={GREEN}
        fontFamily="var(--font-hand), cursive"
        fontSize="22"
      >
        balances
      </text>
      {rows.map(([address, amount], index) => {
        const y = -28 + index * 18;
        const highlighted =
          (mode === "balance" && index === 2) ||
          (mode === "mint" && index === 2) ||
          (mode === "frozen" && index === 2);
        const burned = mode === "mint" && index === 4;
        return (
          <g key={address}>
            {highlighted ? (
              <rect x="-150" y={y - 13} width="300" height="18" rx="4" fill="#b7e4d2" />
            ) : null}
            {burned ? (
              <rect x="-150" y={y - 13} width="300" height="18" rx="4" fill="#f8d0cb" />
            ) : null}
            <text x="-142" y={y} fill={INK} fontSize="13" fontFamily="ui-monospace, monospace">
              {address}
            </text>
            <text
              x="142"
              y={y}
              fill={burned ? "#9f2d22" : INK}
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              {amount}
            </text>
            {burned ? (
              <line x1="-150" y1={y - 4} x2="150" y2={y - 4} stroke="#9f2d22" strokeWidth="1.6" />
            ) : null}
            {mode === "frozen" && highlighted ? (
              <text x="86" y={y} fontSize="12">
                🔒
              </text>
            ) : null}
          </g>
        );
      })}
      {mode === "balance" ? (
        <text
          x="120"
          y="78"
          fill={GREEN}
          fontFamily="var(--font-hand), cursive"
          fontSize="26"
          textAnchor="middle"
        >
          your balance
        </text>
      ) : null}
      {mode === "mint" ? (
        <g fontFamily="var(--font-hand), cursive" fontSize="24">
          <text x="-120" y="92" fill={GREEN}>
            new USD₮
          </text>
          <text x="70" y="92" fill="#9f2d22">
            pulled back
          </text>
        </g>
      ) : null}
      {mode === "frozen" ? (
        <text
          x="0"
          y="96"
          fill="#9f2d22"
          fontFamily="var(--font-hand), cursive"
          fontSize="26"
          textAnchor="middle"
        >
          can’t move
        </text>
      ) : null}
    </g>
  );
}

function ChainBars() {
  const rows = [
    { name: "Tron", value: circulation.tron, width: circulation.tron / circulation.total },
    { name: "Ethereum", value: circulation.ethereum, width: circulation.ethereum / circulation.total },
    { name: "Other chains", value: chainRemainder, width: chainRemainder / circulation.total },
  ];

  return (
    <g>
      <text
        x="-190"
        y="-78"
        fill={INK}
        fontFamily="var(--font-hand), cursive"
        fontSize="28"
      >
        net circulation
      </text>
      <text x="190" y="-78" fill={GREEN} fontSize="16" textAnchor="end" fontFamily="var(--font-geist-sans), sans-serif">
        {billions(circulation.total)}
      </text>
      {rows.map((row, index) => {
        const y = -40 + index * 52;
        return (
          <g key={row.name}>
            <text x="-190" y={y} fill={INK} fontSize="15" fontFamily="var(--font-geist-sans), sans-serif">
              {row.name}
            </text>
            <text x="190" y={y} fill={INK} fontSize="15" textAnchor="end" fontFamily="var(--font-geist-sans), sans-serif">
              {billions(row.value)}
            </text>
            <rect x="-190" y={y + 8} width="380" height="12" rx="6" fill="#e4efe9" />
            <rect x="-190" y={y + 8} width={380 * row.width} height="12" rx="6" fill={GREEN} />
          </g>
        );
      })}
    </g>
  );
}

export function Coin({ scene, previous, progress, filter, reduced }: CoinProps) {
  const pose = applyFilter(blendScenes(scene, previous, reduced ? 1 : progress), filter);

  return (
    <svg
      viewBox="0 0 640 680"
      className="h-full w-full"
      role="img"
      aria-label="Illustrated breakdown of a USDT token"
    >
      <defs>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#8dceb8" strokeWidth="1.4" />
        </pattern>
        <radialGradient id="ledger-shade" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#cfc6b8" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <Layer id="coin" pose={pose.coin}>
        <CoinFace />
      </Layer>

      <Layer id="ledger" pose={pose.ledger}>
        <text
          x="-300"
          y="8"
          fill={INK}
          fontFamily="var(--font-hand), cursive"
          fontSize="26"
        >
          no coin here
        </text>
        <LedgerSheet mode="balance" />
      </Layer>

      <Layer id="contract" pose={pose.contract}>
        <g>
          <rect x="-150" y="-110" width="300" height="220" rx="16" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <text x="-126" y="-74" fill={GREEN} fontSize="14" fontFamily="var(--font-geist-sans), sans-serif">
            ETHEREUM CONTRACT
          </text>
          <text x="-126" y="-36" fill={INK} fontSize="18" fontFamily="ui-monospace, monospace">
            0xdAC1…1ec7
          </text>
          <text x="-126" y="4" fill={INK} fontSize="16" fontFamily="var(--font-geist-sans), sans-serif">
            6 decimal places
          </text>
          <text x="-126" y="32" fill="#5c675f" fontSize="15" fontFamily="var(--font-geist-sans), sans-serif">
            smallest unit 0.000001
          </text>
          <text x="-126" y="78" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="28">
            anyone can read it
          </text>
        </g>
      </Layer>

      <Layer id="chains" pose={pose.chains}>
        <ChainBars />
      </Layer>

      <Layer id="mint" pose={pose.mint}>
        <LedgerSheet mode="mint" />
        <g transform="translate(196 -20)">
          <rect x="0" y="0" width="78" height="48" rx="4" fill={PAPER} stroke={INK} strokeWidth="2" />
          <rect x="8" y="-8" width="78" height="48" rx="4" fill={PAPER} stroke={INK} strokeWidth="2" />
          <text x="18" y="22" fill={GREEN} fontFamily="var(--font-hand), cursive" fontSize="22">
            $
          </text>
          <text x="-20" y="78" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="22">
            dollars in
          </text>
        </g>
      </Layer>

      <Layer id="reserves" pose={pose.reserves}>
        <g fontFamily="var(--font-geist-sans), sans-serif">
          <text x="-180" y="-90" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="30">
            30 Sept 2026
          </text>
          {[
            ["Assets", billions(reserves.assets)],
            ["Liabilities", billions(reserves.liabilities)],
            ["Net equity", billions(reserves.equity)],
          ].map(([label, value], index) => (
            <g key={label} transform={`translate(0 ${index * 70})`}>
              <text x="-180" y="0" fill="#5c675f" fontSize="16">
                {label}
              </text>
              <text x="-180" y="32" fill={index === 2 ? GREEN : INK} fontSize="28">
                {value}
              </text>
            </g>
          ))}
        </g>
      </Layer>

      <Layer id="yield" pose={pose.yield}>
        <g>
          <path d="M -40 0 H 90" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="100" y="-8" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="28">
            stays with Tether
          </text>
          <text x="-40" y="48" fill="#5c675f" fontSize="16" fontFamily="var(--font-geist-sans), sans-serif">
            holder is paid face value, less fees
          </text>
        </g>
      </Layer>

      <Layer id="peg" pose={pose.peg}>
        <g>
          <text x="-160" y="-90" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="30">
            one dollar, on Tether’s site
          </text>
          <line x1="-160" y1="0" x2="170" y2="0" stroke="#c9c2b6" strokeWidth="2" strokeDasharray="4 6" />
          <text x="178" y="4" fill={GREEN} fontSize="14" fontFamily="var(--font-geist-sans), sans-serif">
            $1
          </text>
          <path
            d="M -160 8 C -110 8, -80 10, -40 36 S 20 18, 80 6 S 140 4, 170 2"
            fill="none"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="-160" y="78" fill="#5c675f" fontSize="16" fontFamily="var(--font-geist-sans), sans-serif">
            exchanges trade at whatever buyers pay
          </text>
        </g>
      </Layer>

      <Layer id="freeze" pose={pose.freeze}>
        <LedgerSheet mode="frozen" />
      </Layer>

      <Layer id="terms" pose={pose.terms}>
        <g>
          <rect x="-170" y="-120" width="340" height="250" rx="14" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <text x="-146" y="-80" fill={INK} fontFamily="var(--font-hand), cursive" fontSize="32">
            read the terms
          </text>
          {[
            "Not legal tender",
            "No FDIC or SIPC cover",
            "Most U.S. persons excluded",
            "Redemption can be delayed",
          ].map((line, index) => (
            <text
              key={line}
              x="-146"
              y={-30 + index * 36}
              fill={INK}
              fontSize="18"
              fontFamily="var(--font-geist-sans), sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      </Layer>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GREEN} />
        </marker>
      </defs>
    </svg>
  );
}

function Layer({
  id,
  pose,
  children,
}: {
  id: LayerId;
  pose: Xform;
  children: ReactNode;
}) {
  return (
    <g
      data-layer={id}
      opacity={pose.opacity}
      transform={`translate(${pose.x} ${pose.y}) scale(${pose.scale})`}
    >
      {children}
    </g>
  );
}
