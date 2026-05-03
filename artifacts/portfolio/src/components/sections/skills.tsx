import { GlassCard } from "@/components/ui/glass-card";

const skills = [
  {
    category: "Languages & Frameworks",
    items: ["Python", "PHP (Laravel)", "C# (ASP.NET Core)", "Dart (Flutter)", "JavaScript / TypeScript", "React"]
  },
  {
    category: "Databases",
    items: ["Oracle Database", "SQL Server", "MongoDB", "Azure Cosmos DB"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Microsoft Azure", "Git / GitHub", "Docker", "CI/CD pipelines"]
  },
  {
    category: "AI & ML",
    items: ["TensorFlow", "OpenAI API", "Deepgram", "ElevenLabs", "NLP integration"]
  },
  {
    category: "APIs & Integration",
    items: ["RESTful API design", "Twilio Voice SDK", "WhatsApp Cloud API", "Meta Webhooks"]
  },
  {
    category: "Tools",
    items: ["Supabase", "Vite", "Tailwind CSS", "Trello", "Postman", "Ngrok"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => (
            <GlassCard key={idx} delay={idx * 0.1}>
              <h3 className="text-lg font-medium text-foreground mb-6 font-mono border-b border-white/10 pb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-muted-foreground hover:text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}