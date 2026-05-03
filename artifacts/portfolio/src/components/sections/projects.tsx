import { GlassCard } from "@/components/ui/glass-card";

const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "Connect Hub AI",
    date: "01/2025 – Present",
    type: "Graduation Project",
    image: `${base}project-connect-hub.png`,
    stack: ["React", "TypeScript", "Node.js", "Python/FastAPI", "Twilio", "OpenAI", "Deepgram", "ElevenLabs", "Supabase"],
    description: "Architected a unified multi-channel AI customer-service platform for PIB handling WhatsApp messaging and live voice calls via Twilio Voice SDK.",
    highlights: [
      "Built a real-time React/TypeScript dashboard for session monitoring, employee management, and live analytics.",
      "Developed a Python/FastAPI microservice for WhatsApp automation (Meta Webhooks, OTP).",
      "Integrated OpenAI NLP, Deepgram STT, and ElevenLabs TTS into the communication pipeline."
    ]
  },
  {
    title: "Trade & Barter Marketplace",
    date: "11/2024 – 01/2025",
    type: "Mobile App",
    image: `${base}project-barter.png`,
    stack: ["Flutter", "Dart", "Firebase", "Trello"],
    description: "Built a Flutter peer-to-peer barter app with secure auth, real-time messaging, and location-based listings.",
    highlights: [
      "Reduced search time by 40% and load times by 60% via local caching strategies.",
      "Managed full lifecycle using Trello for sprint planning across a four-person international team at Mälardalen University (Sweden)."
    ]
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Selected Works</h2>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <GlassCard hoverEffect={true} className="p-2 overflow-hidden group">
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </GlassCard>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary font-mono text-sm uppercase tracking-wider">{project.type}</span>
                    <span className="text-muted-foreground text-sm font-mono">{project.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                </div>

                <GlassCard className="p-6 bg-foreground/5 border-none">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-primary">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}