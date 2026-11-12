/** Figures copied from Tether’s own pages. Rounded only for display. */

export const circulation = {
  asOf: "11 November 2026, 11:30 p.m. UTC",
  total: 175_795_082_919.42,
  tron: 92_235_835_675.29,
  ethereum: 79_736_309_253.69,
  href: "https://tether.to/transparency/?tab=usdt",
} as const;

export const reserves = {
  asOf: "30 September 2026",
  assets: 191_451_091_374,
  liabilities: 183_496_460_904,
  equity: 7_954_630_470,
  href: "https://tether.to/transparency/?tab=usdt",
} as const;

export const ethereumUsdt = {
  address: "0xdAC17F958D2ee523a2206206994597c13d831ec7",
  decimals: 6,
  href: "https://tether.to/en/supported-protocols/",
  explorer: "https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7",
} as const;

export const fees = {
  minimumUsd: 100_000,
  acquisition: "0.1%",
  redemption: "the greater of $1,000 or 0.1%",
  verificationUsdt: 150,
  href: "https://tether.to/en/fees/",
} as const;

export function billions(amount: number): string {
  return `$${(amount / 1_000_000_000).toFixed(2)} billion`;
}

export const chainRemainder =
  circulation.total - circulation.tron - circulation.ethereum;
