export type LiveDemo = {
  slug: string;
  title: string;
  description: string;
  url: string;
  repo: string;
  tags: string[];
};

export const demos: LiveDemo[] = [
  {
    slug: "virtual-museum",
    title: "Virtual Museum",
    description:
      "An immersive 3D virtual museum experience built with WebGL and Three.js — walk through galleries and inspect exhibits in your browser.",
    url: "https://aliomar0.github.io/Virtual_Museum/",
    repo: "https://github.com/AliOmar0/Virtual_Museum",
    tags: ["Three.js", "WebGL", "3D"],
  },
  {
    slug: "celestial-canvas",
    title: "Celestial Canvas",
    description:
      "A generative cosmic art canvas where particles paint procedural starfields, nebulae, and orbital trails.",
    url: "https://aliomar0.github.io/celestial-canvas/",
    repo: "https://github.com/AliOmar0/celestial-canvas",
    tags: ["Canvas", "Generative", "JavaScript"],
  },
  {
    slug: "photo-sphere",
    title: "3D Photo Sphere",
    description:
      "A 360° panoramic photo viewer rendered on a 3D sphere — drag to look around in any direction.",
    url: "https://aliomar0.github.io/3D-Photo-Sphere/",
    repo: "https://github.com/AliOmar0/3D-Photo-Sphere",
    tags: ["Three.js", "360°", "Panorama"],
  },
  {
    slug: "floral-procedure",
    title: "Floral Procedure Animator",
    description:
      "Procedural flower-growth animations driven by L-systems — watch petals and stems unfold in real time.",
    url: "https://aliomar0.github.io/Floral-Procedure-Animator/",
    repo: "https://github.com/AliOmar0/Floral-Procedure-Animator",
    tags: ["Procedural", "Animation", "Canvas"],
  },
  {
    slug: "book-haven",
    title: "Book Haven",
    description:
      "A clean storefront-style book catalogue with browsing, search, and detail views.",
    url: "https://aliomar0.github.io/Book-Haven/",
    repo: "https://github.com/AliOmar0/Book-Haven",
    tags: ["UI", "Catalogue", "Frontend"],
  },
  {
    slug: "pretext-sandbox",
    title: "Pretext Sandbox",
    description:
      "A sandbox for prototyping prompt-engineering and pre-text patterns for LLMs in the browser.",
    url: "https://aliomar0.github.io/Pretext-Sandbox/",
    repo: "https://github.com/AliOmar0/Pretext-Sandbox",
    tags: ["LLM", "Prompts", "Sandbox"],
  },
];
