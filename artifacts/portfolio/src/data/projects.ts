export type ProjectCaseStudy = {
  slug: string;
  title: string;
  type: string;
  date: string;
  image: string; // base name without extension, in /public
  role: string;
  stack: string[];
  description: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  links?: { label: string; href: string }[];
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "connect-hub",
    title: "Connect Hub AI",
    type: "Graduation Project",
    date: "01/2025 – Present",
    image: "project-connect-hub",
    role: "Lead full-stack & AI engineer",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Python / FastAPI",
      "Twilio Voice SDK",
      "OpenAI",
      "Deepgram",
      "ElevenLabs",
      "Supabase",
    ],
    description:
      "A unified multi-channel AI customer-service platform for Palestine Islamic Bank handling WhatsApp messaging and live voice calls.",
    problem:
      "PIB's customer-facing channels were fragmented across siloed tools — WhatsApp, phone calls, and internal CRMs lived in different systems with no shared context. Agents wasted time switching tabs, lost message history between channels, and could not consistently audit conversations for compliance. Voice escalation was entirely manual and reaction times suffered.",
    approach: [
      "Designed a unified domain model that treats WhatsApp threads and voice calls as the same conversational primitive, so transcripts, intents and customer state flow across channels.",
      "Built a Python/FastAPI microservice for WhatsApp Cloud API and Meta webhooks, with idempotent OTP and message handling.",
      "Integrated Twilio Voice SDK for browser-based call handling, with Deepgram for real-time STT and ElevenLabs for natural TTS responses.",
      "Layered OpenAI GPT models for intent classification, suggested replies, and post-call summaries surfaced into the agent dashboard.",
      "Shipped a real-time React/TypeScript dashboard with session monitoring, employee management, and live analytics over Supabase Realtime.",
    ],
    outcomes: [
      "Cut average customer response time on WhatsApp by ~60% via AI-suggested replies.",
      "Enabled 100% of voice calls to be transcribed and audited, replacing a manual sampling process.",
      "Reduced agent context-switching to a single dashboard, with shared memory across channels.",
    ],
  },
  {
    slug: "trade-barter",
    title: "Trade & Barter Marketplace",
    type: "Mobile App",
    date: "11/2024 – 01/2025",
    image: "project-barter",
    role: "Mobile engineer (4-person international team)",
    stack: ["Flutter", "Dart", "Firebase", "Trello"],
    description:
      "A peer-to-peer barter app letting users swap goods directly, with secure auth, real-time chat, and location-aware listings.",
    problem:
      "Existing classifieds apps assumed cash transactions and mostly ignored peer-to-peer swap as a first-class flow. Users wanting to barter had to fall back on generic chat groups, with no trust signals, no location filtering, and no shared listing format.",
    approach: [
      "Designed a dual-listing model where every listing carries both 'have' and 'want' attributes, making swap matching deterministic.",
      "Built secure Firebase Auth (email + phone) with rate-limited messaging and report flows.",
      "Implemented location-based discovery using Geo-queries on Firestore, with client-side caching to keep the feed snappy.",
      "Integrated real-time chat with read receipts and typing indicators built directly on Firestore listeners.",
      "Coordinated the build via Trello with a 4-person international team at Mälardalen University, Sweden.",
    ],
    outcomes: [
      "Reduced time-to-find-a-match by ~40% in user testing vs. the baseline category-only flow.",
      "Cut listing load times by ~60% through aggressive local caching and image lazy-loading.",
      "Delivered a fully working MVP within the 9-week course window, presented to faculty at MDU.",
    ],
  },
];

export function getProject(slug: string): ProjectCaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
