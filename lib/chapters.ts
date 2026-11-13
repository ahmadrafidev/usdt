import { billions, chainRemainder, circulation, ethereumUsdt } from "@/lib/facts";

export type PieceFilter = "all" | "record" | "tether";

export type ChapterSide = "record" | "tether" | "both";

export type SceneId =
  | "intro"
  | "ledger"
  | "contract"
  | "chains"
  | "mint"
  | "reserves"
  | "yield"
  | "peg"
  | "freeze"
  | "terms"
  | "pieces";

export const sideLabel: Record<ChapterSide, string> = {
  record: "On the public blockchain",
  tether: "In Tether’s reports",
  both: "Blockchain and Tether’s reports",
};

export type SourceLink = {
  label: string;
  href: string;
};

export type GlossaryEntry = {
  term: string;
  body: string;
};

export type Chapter = {
  id: string;
  title: string;
  scene: SceneId;
  side: ChapterSide | null;
  showFilter?: boolean;
  paragraphs: string[];
  glossary: GlossaryEntry[];
  sources: SourceLink[];
};

const terms: SourceLink = {
  label: "Tether token terms",
  href: "https://tether.to/legal/",
};

const transparency: SourceLink = {
  label: "Tether transparency",
  href: circulation.href,
};

const protocols: SourceLink = {
  label: "Supported protocols",
  href: ethereumUsdt.href,
};

const feeSchedule: SourceLink = {
  label: "Tether fees",
  href: "https://tether.to/en/fees/",
};

const faqs: SourceLink = {
  label: "Tether FAQ",
  href: "https://tether.to/en/faqs/",
};

const information: SourceLink = {
  label: "Relevant information document",
  href: "https://tether.to/public/Relevant_Information_Document_-_Tether_International,_S.A._de_C.V..pdf",
};

export const chapters: Chapter[] = [
  {
    id: "what",
    title: "What is USDT?",
    scene: "intro",
    side: null,
    paragraphs: [
      "USDT is a digital stand-in for the US dollar, issued by a company called Tether. On its own site Tether writes it USD₮.",
      "Tether says each token in circulation is backed by assets equal to its stated value. When Tether itself sells one, the price is one dollar plus a fee.",
      "The coin in the drawing is that promise. The rest of this page is what is actually behind it.",
    ],
    glossary: [],
    sources: [terms, transparency],
  },
  {
    id: "why",
    title: "Why people use it",
    scene: "intro",
    side: null,
    paragraphs: [
      "Bitcoin and similar coins change price all the time. A token pegged to the dollar is meant to stay near one dollar, so people can hold a dollar amount inside a crypto app.",
      "Tether calls these stablecoins. Its FAQ says the token moves on a blockchain as easily as other crypto, but is tied to a familiar currency.",
      "That tie is not the same thing as cash in a bank. Who can turn it back into dollars, and on what terms, comes later.",
    ],
    glossary: [
      {
        term: "Stablecoin",
        body: "Tether’s word for a token pegged to a currency such as the US dollar, so the token itself is meant to avoid the price swings of coins like bitcoin.",
      },
    ],
    sources: [faqs],
  },
  {
    id: "no-coin",
    title: "There is no coin",
    scene: "ledger",
    side: "record",
    paragraphs: [
      "Nothing metal changes hands, and there is no file with your name on it. Tether describes USD₮ as a digital token that moves on a blockchain, the same way other crypto does.",
      "What you hold is a number written next to an address, in a shared list that many computers keep. Sending it means the list changes. You do not pass someone an object.",
    ],
    glossary: [
      {
        term: "Blockchain",
        body: "A shared list of transactions, copied across many computers. USD₮ does not live in Tether’s app. It lives as entries in that list.",
      },
    ],
    sources: [faqs],
  },
  {
    id: "address",
    title: "The address is the account",
    scene: "ledger",
    side: "record",
    paragraphs: [
      "An address is a long string of letters and numbers. It works like an account number. The balance sits next to it.",
      "A private key is the secret that controls that address. Whoever has the key can send the USDT. Lose the key and Tether does not reset it for you, the way a bank can reset a password.",
    ],
    glossary: [
      {
        term: "Address",
        body: "The account a balance is assigned to. In its terms, Tether calls one it can freeze a digital token address.",
      },
    ],
    sources: [faqs, terms],
  },
  {
    id: "contract",
    title: "A program keeps the list",
    scene: "contract",
    side: "record",
    paragraphs: [
      "On Ethereum, the rules and the balances live in a small program Tether publishes. That program is called a smart contract. Anyone can read it and see what it did.",
      `Tether’s supported-protocols page gives the Ethereum address as ${ethereumUsdt.address}. A token that only uses the name USDT, at a different address, is not this one.`,
      "Tether also says a wrapped or bridged copy, made by someone else, is not a Tether token. Those copies cannot be redeemed with Tether.",
    ],
    glossary: [
      {
        term: "Smart contract",
        body: "The program stored on a blockchain that records who owns the tokens and how they move. Tether tells apps which program to trust by publishing its address.",
      },
    ],
    sources: [protocols, terms, faqs],
  },
  {
    id: "decimals",
    title: "How small a piece can be",
    scene: "contract",
    side: "record",
    paragraphs: [
      `The Ethereum contract Tether publishes splits each token into ${ethereumUsdt.decimals} decimal places. One USDT is stored as one million units. The smallest amount you can move there is 0.000001 USDT.`,
      "That is a property of this contract, read from the program itself. It is not a fee, and it is not a promise that an app will let you trade dust that small.",
    ],
    glossary: [
      {
        term: "Decimal places",
        body: "How finely the contract divides one token. Six places means the chain can record down to one millionth of a USDT.",
      },
    ],
    sources: [protocols],
  },
  {
    id: "chains",
    title: "The same dollar, many networks",
    scene: "chains",
    side: "record",
    paragraphs: [
      "Tether does not issue USDT on one list only. It says a token on one blockchain it supports should equal a token on another: one for one. You still have to send it on the network the address belongs to.",
      `On ${circulation.asOf}, Tether’s transparency page showed ${billions(circulation.total)} of USD₮ in net circulation. ${billions(circulation.tron)} was on Tron and ${billions(circulation.ethereum)} on Ethereum. The other ${billions(chainRemainder)} sat on the remaining networks it still reports.`,
      "Send Tron USDT to an Ethereum address, or the other way around, and it does not arrive as that network’s USDT. The name matches. The list does not.",
    ],
    glossary: [
      {
        term: "Network",
        body: "The particular blockchain a balance lives on, such as Tron or Ethereum. Tether’s page lists which ones it supports. An address on one network is not an address on another.",
      },
    ],
    sources: [protocols, transparency],
  },
  {
    id: "gas",
    title: "Holding it is not enough to send it",
    scene: "chains",
    side: "both",
    paragraphs: [
      "Each network charges its own fee to write a transfer into the list. That fee is paid in the network’s coin, such as TRX on Tron or ETH on Ethereum, not in USDT.",
      "You can hold USDT and still be unable to send it, because you have none of that other coin. Tether’s own fees are separate. They apply when a checked customer buys or cashes out with Tether, not when two people send tokens to each other.",
    ],
    glossary: [
      {
        term: "Network fee",
        body: "The charge for recording a transfer, paid in the network’s own coin. People often call it gas. It is not Tether’s redemption fee.",
      },
    ],
    sources: [protocols, feeSchedule],
  },
  {
    id: "retired",
    title: "Some old networks are closed",
    scene: "chains",
    side: "tether",
    paragraphs: [
      "Tether used to issue USDT on more networks than it does now. From 1 September 2025, its terms say it stopped issuing USDT on Omni, Bitcoin Cash SLP, Kusama, EOS, and Algorand, and is no longer obliged to redeem tokens there.",
      "A balance on a network Tether has dropped is not the same promise as a balance on a network it still lists. The supported-protocols page is the list that matters.",
    ],
    glossary: [],
    sources: [terms, protocols],
  },
  {
    id: "two-doors",
    title: "Most people never meet Tether",
    scene: "mint",
    side: "both",
    paragraphs: [
      "There are two doors. One is Tether itself. The other is everyone else: an exchange, a shop, or a person who already holds some.",
      "Tether only sells through its site to customers it has checked, and only from $100,000. Its fee for that purchase is 0.1%. Opening an account costs 150 USD₮. Tether says that deposit is not refunded, but it can be used toward a later cash-out.",
      "If you bought USDT in an app for twenty dollars, you bought it from someone else. You do not have Tether’s promise to cash that twenty dollars back out.",
    ],
    glossary: [
      {
        term: "Verified customer",
        body: "Someone Tether has approved after identity checks. Only those customers can buy from, or cash out with, Tether itself. Tether can refuse the application.",
      },
    ],
    sources: [feeSchedule, faqs, information],
  },
  {
    id: "created",
    title: "How new USDT appears",
    scene: "mint",
    side: "both",
    paragraphs: [
      "Tether first creates tokens and holds them. Its FAQ calls that stock “authorized but not issued.” Those tokens are not counted as money in circulation.",
      "They are issued when Tether transfers them out of that treasury. That can be to a verified customer who has sent in dollars. Several of Tether’s own keys have to sign before new tokens can be created, so one person cannot do it alone.",
    ],
    glossary: [
      {
        term: "Authorized but not issued",
        body: "Tokens that exist on the blockchain but still sit with Tether. They are inventory, not part of the supply people hold.",
      },
    ],
    sources: [faqs],
  },
  {
    id: "removed",
    title: "How USDT is taken back",
    scene: "mint",
    side: "both",
    paragraphs: [
      "A verified customer can send USDT back to Tether and ask for dollars. The minimum is $100,000. The fee is the greater of $1,000 or 0.1%. Tether pays the dollars, minus that fee, to a bank account in the customer’s name.",
      "Tether can then destroy tokens, which it calls burning, so the authorized supply shrinks. Returned tokens can also sit in the treasury for a later sale, out of circulation either way.",
    ],
    glossary: [
      {
        term: "Burn",
        body: "Tether’s word for destroying tokens so fewer authorized tokens exist. It is how supply comes down after a cash-out, and it is not something a holder can do.",
      },
    ],
    sources: [feeSchedule, faqs, terms],
  },
  {
    id: "reserves",
    title: "What backs the tokens",
    scene: "reserves",
    side: "tether",
    paragraphs: [
      "USDT is not a claim on a dollar bill with your name on it. The breakdown on the left is Tether’s own reserves report. Tether chooses what sits in that pool, and a holder does not own a slice of it.",
    ],
    glossary: [
      {
        term: "Reserves",
        body: "The pool of assets Tether says stands behind tokens in circulation. Tether decides what goes in the pool. Holders do not.",
      },
      {
        term: "Net equity",
        body: "Assets minus liabilities in the reserves report. Tether treats the extra as a cushion, including against bitcoin’s price swings. It is not money paid to people holding USDT.",
      },
    ],
    sources: [transparency, faqs, terms],
  },
  {
    id: "snapshot",
    title: "The report is one moment",
    scene: "reserves",
    side: "tether",
    paragraphs: [
      "Tether publishes a reserves report about once a quarter. BDO Italia, an accounting firm, checks that report. Tether’s own information document says these reports are not a full set of financial statements. They are a selection of numbers, with estimates in them.",
      "The check is true of one date, here 30 September 2026, not of the day you are reading this. Circulation figures on the site are usually updated daily, and Tether says those can lag. It does not promise to refresh either page on a fixed clock.",
    ],
    glossary: [
      {
        term: "Attestation",
        body: "BDO’s check of the reserves report for a single date. Tether presents it as assurance on that report, not as a full audit of the company.",
      },
    ],
    sources: [faqs, information, transparency],
  },
  {
    id: "interest",
    title: "You do not earn the interest",
    scene: "yield",
    side: "tether",
    paragraphs: [
      "The assets in the reserves can earn a return. That income does not get paid out to people holding USDT.",
      "Tether’s information document says holders are not entitled to any rise in the value of the reserves above the token’s face value, after fees. A verified customer who cashes out receives one dollar per token, minus the fee. The return on the assets stays with Tether.",
      "Holding USDT is not a savings account. The price you hope for is still about one dollar, not one dollar plus yield.",
    ],
    glossary: [],
    sources: [information, terms],
  },
  {
    id: "peg",
    title: "Why the price stays near $1",
    scene: "peg",
    side: "both",
    paragraphs: [
      "Tether says USD₮ is pegged one-to-one with the dollar. On its own site the buy price is one dollar plus fees, and the cash-out price is one dollar minus fees. That cash-out is only for a verified customer, into a bank account in their name.",
      "That is the mechanism. A trader who can cash out at Tether can buy tokens in the market when they trade under a dollar, then redeem them. People who cannot cash out directly get whatever price a buyer will pay.",
      "Nothing in the terms forces an exchange to trade at exactly one dollar. Tether can also delay or suspend a purchase or a cash-out.",
    ],
    glossary: [
      {
        term: "Peg",
        body: "The one-dollar price Tether states. On its site, after fees, that is the buy and cash-out price for a verified customer. It is not a guarantee of the price in an app.",
      },
    ],
    sources: [terms, faqs],
  },
  {
    id: "freeze",
    title: "Tether can lock a balance",
    scene: "freeze",
    side: "record",
    paragraphs: [
      "This is not like cash, which a company cannot freeze from a distance. Tether’s terms let it freeze tokens and blacklist an address that holds them. The USDT at a blacklisted address cannot be sent.",
      "Its FAQ says that, in some cases, it may seize and destroy tokens when a government or law enforcement agency asks. The holder does not get a vote. That switch belongs to Tether.",
    ],
    glossary: [
      {
        term: "Blacklist",
        body: "Tether’s word for blocking an address. The terms list it with freezing and confiscating tokens when Tether decides a use is prohibited.",
      },
    ],
    sources: [terms, faqs],
  },
  {
    id: "not-a-bank",
    title: "It is not a bank deposit",
    scene: "terms",
    side: "tether",
    paragraphs: [
      "Tether’s terms say the tokens are not legal tender. They are not dollars, even though each one is meant to track a dollar.",
      "They are not protected by the FDIC, the US deposit-insurance fund, or by SIPC, which protects some brokerage accounts. If Tether cannot pay, that insurance is not standing behind the token.",
      "A cash-out can be delayed, refused, or suspended. Tether can stop access when it suspects a broken rule, a legal problem, or a risk to itself.",
    ],
    glossary: [
      {
        term: "Legal tender",
        body: "Money a government says must be accepted for debts. Tether’s terms say its tokens are not that.",
      },
    ],
    sources: [terms],
  },
  {
    id: "who",
    title: "Who Tether will deal with",
    scene: "terms",
    side: "tether",
    paragraphs: [
      "Tether’s terms bar most people in the United States from holding the tokens or using them. The exception it writes down is an eligible contract participant it agrees to accept: under US law, a person or firm large and experienced enough to trade outside ordinary retail rules.",
      "People in places under sanctions, and others Tether defines as prohibited, cannot hold a Tether wallet or use the service. The full list is in the terms, not in the token’s name.",
    ],
    glossary: [
      {
        term: "U.S. person",
        body: "Tether’s terms stop U.S. persons from holding a Tether wallet or the tokens, except eligible contract participants it chooses to accept.",
      },
    ],
    sources: [terms],
  },
  {
    id: "pieces",
    title: "What you can check",
    scene: "pieces",
    side: null,
    showFilter: true,
    paragraphs: [
      "Some of this you can look up yourself. The balance is a public entry. The contract address is the one Tether publishes. An address Tether has blacklisted is a fact on that list.",
      "The rest you take from Tether. The reserves, the bank cash-out, who keeps the interest, and who is allowed through the door are promises and rules in its pages, not something the drawing can prove.",
      "The filter splits the picture along that line.",
    ],
    glossary: [],
    sources: [transparency, terms, protocols],
  },
  {
    id: "close",
    title: "Now follow the money",
    scene: "intro",
    side: null,
    paragraphs: [
      "You have seen how USDT is created, how it moves, and what stands behind it. But USDT is only one piece of a much larger financial system.",
      "The next chapter is about more than stablecoins. It is about who gets to issue money, move it, and build the infrastructure around it"
    ],
    glossary: [],
    sources: [],
  },
];
