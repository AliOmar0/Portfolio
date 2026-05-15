import { Brain, Cloud, Code2, FileCode2 } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { TechStackGrid, type TechGroup } from "@/components/ui/tech-stack";

// Real brand colors via simpleicons.org. A few major brands (OpenAI, Azure,
// VS Code, C#) have been removed from simple-icons due to trademark policy,
// so we fall back to Lucide icons for those.
const groups: TechGroup[] = [
  {
    category: "Languages & Frameworks",
    items: [
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "C# / .NET", color: "512BD4", icon: FileCode2 },
      { name: "PHP / Laravel", slug: "laravel", color: "FF2D20" },
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
      { name: "SQL Server", slug: "microsoftsqlserver", color: "CC2927" },
      { name: "Oracle", slug: "oracle", color: "F80000" },
      { name: "Supabase", slug: "supabase", color: "3FCF8E" },
      { name: "Firebase", slug: "firebase", color: "DD2C00" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Azure", color: "0078D4", icon: Cloud },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "GitHub", slug: "github", color: "8b9bb4" },
      { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
      { name: "Vercel", slug: "vercel", color: "8b9bb4" },
      { name: "Linux", slug: "linux", color: "FCC624" },
    ],
  },
  {
    category: "AI & Integrations",
    items: [
      { name: "OpenAI", color: "10A37F", icon: Brain },
      { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
      { name: "Twilio", slug: "twilio", color: "F22F46" },
      { name: "WhatsApp", slug: "whatsapp", color: "25D366" },
      { name: "Postman", slug: "postman", color: "FF6C37" },
      { name: "Stripe", slug: "stripe", color: "635BFF" },
    ],
  },
  {
    category: "Frontend & Styling",
    items: [
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
      { name: "Framer Motion", slug: "framer", color: "0055FF" },
      { name: "Three.js", slug: "threedotjs", color: "8b9bb4" },
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "HTML5", slug: "html5", color: "E34F26" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "VS Code", color: "007ACC", icon: Code2 },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "Trello", slug: "trello", color: "0079BF" },
      { name: "Notion", slug: "notion", color: "8b9bb4" },
      { name: "npm", slug: "npm", color: "CB3837" },
      { name: "Markdown", slug: "markdown", color: "8b9bb4" },
    ],
  },
];

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("skills.title")}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        <TechStackGrid groups={groups} />
      </div>
    </section>
  );
}
